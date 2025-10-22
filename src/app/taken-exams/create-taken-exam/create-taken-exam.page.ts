import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonSpinner,
  IonText,
  IonNote,
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { of, forkJoin } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { ExamHeaderComponent } from './exam-header/exam-header.component';
import { ExamProgressComponent } from './exam-progress/exam-progress.component';
import { ExamTimerComponent } from './exam-timer/exam-timer.component';
import { ExamQuestionComponent } from './exam-question/exam-question.component';
import { SubmitModalComponent } from './submit-modal/submit-modal.component';

@Component({
  selector: 'app-create-taken-exam',
  templateUrl: './create-taken-exam.page.html',
  styleUrls: ['./create-taken-exam.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonIcon,
    IonSpinner,
    IonText,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExamHeaderComponent,
    ExamProgressComponent,
    ExamTimerComponent,
    ExamQuestionComponent,
    SubmitModalComponent,
  ],
})
export class CreateTakenExamPage implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Expose Math for template
  Math = Math;

  // Signals for state management
  takenExam = signal<ITakenExam | null>(null);
  examItems = signal<IExamItem[]>([]);
  answers = signal<Record<string, any>>({});
  currentQuestionIndex = signal(0);

  loading = signal(false);
  submitting = signal(false);
  isSaving = signal(false);
  error = signal<string | null>(null);
  showSubmitModal = signal(false);

  // Computed properties
  currentQuestion = computed(() => {
    const items = this.examItems();
    const index = this.currentQuestionIndex();
    return items[index] || null;
  });

  answeredCount = computed(() => {
    const answers = this.answers();
    return Object.keys(answers).filter(
      (key) =>
        answers[key] !== undefined &&
        answers[key] !== null &&
        answers[key] !== ''
    ).length;
  });

  progress = computed(() => {
    const total = this.examItems().length;
    const answered = this.answeredCount();
    return total > 0 ? (answered / total) * 100 : 0;
  });

  wasSubmitted = computed(() => this.takenExam()?.submitted_at !== null);

  remainingTime = signal<number>(0);
  private timeInterval: any;

  private savingTimeouts: Record<string, any> = {};

  constructor() {
    addIcons({
      chevronBackOutline,
      chevronForwardOutline,
    });
  }

  ngOnInit() {
    const takenExamId = this.route.snapshot.paramMap.get('id');

    if (!takenExamId) {
      this.error.set('No exam ID provided');
      return;
    }

    this.loadExamData(takenExamId);
  }

  loadExamData(takenExamId: string) {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<{ data: any }>(
        `${environment.apiBaseUrl}/student/taken-exams/${takenExamId}/continue`
      )
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response: any) => {
          const data = response.data || response;
          console.log('Response:', data);

          // Set taken exam - use taken_exam from response
          const takenExam = data.taken_exam;
          this.takenExam.set(takenExam);

          // Set exam items from exam.items
          const items = takenExam?.exam?.items || data.exam?.items || [];
          this.examItems.set(items);

          // Restore answers if they exist
          const answers = takenExam?.answers || data.answers || [];
          if (answers.length > 0) {
            this.restoreAnswers(answers);
          }

          // Initialize timer
          this.initializeTimer();
        },
        error: (err) => {
          console.error('Error loading exam:', err);
          this.error.set(err?.error?.message || 'Failed to load exam');
        },
      });
  }

  private restoreAnswers(answers: ITakenExamAnswer[]) {
    const restored: Record<string, any> = {};
    const itemsMap = new Map(this.examItems().map((item) => [item.id, item]));

    answers.forEach((ans) => {
      const key = ans.exam_item_id;
      let value: any = ans.answer;

      const questionItem = itemsMap.get(key);
      const questionType = questionItem?.type || ans.type;

      // Convert answer based on type
      if (questionType === 'mcq') {
        const num = Number(value);
        if (!Number.isNaN(num)) value = num;
      } else if (questionType === 'truefalse') {
        if (value === '1' || value === 1 || value === true || value === 'true')
          value = true;
        else if (
          value === '0' ||
          value === 0 ||
          value === false ||
          value === 'false'
        )
          value = false;
      } else if (
        questionType === 'shortanswer' ||
        questionType === 'fillblank' ||
        questionType === 'essay'
      ) {
        value = value ?? '';
        if (typeof value !== 'string') value = String(value);
      } else if (questionType === 'matching') {
        try {
          if (typeof value === 'string') value = JSON.parse(value);
        } catch (_) {
          value = [];
        }
        if (!Array.isArray(value)) value = [];
      }

      restored[key] = value;
    });

    this.answers.set(restored);
  }

  private initializeTimer() {
    const exam = this.takenExam();
    if (!exam || !exam.exam) return;

    const endTime = new Date(exam.exam.ends_at).getTime();
    const now = new Date().getTime();
    this.remainingTime.set(Math.max(0, Math.floor((endTime - now) / 1000)));

    this.timeInterval = setInterval(() => {
      this.remainingTime.update((time) => {
        if (time <= 0) {
          clearInterval(this.timeInterval);
          this.autoSubmit();
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  }

  onAnswerChange(value: any) {
    const question = this.currentQuestion();
    if (!question) return;

    this.answers.set({
      ...this.answers(),
      [question.id]: value,
    });

    this.saveAnswerWithDebounce(question, value);
  }

  private saveAnswerWithDebounce(item: IExamItem, value: any) {
    if (this.savingTimeouts[item.id]) {
      clearTimeout(this.savingTimeouts[item.id]);
    }

    this.isSaving.set(true);

    this.savingTimeouts[item.id] = setTimeout(() => {
      this.saveAnswer(item, value);
    }, 1000);
  }

  private saveAnswer(item: IExamItem, value: any) {
    const exam = this.takenExam();
    if (!exam) return;

    this.http
      .post(
        `${environment.apiBaseUrl}/student/taken-exams/${exam.id}/save-answer`,
        {
          item_id: item.id,
          answer: value,
        }
      )
      .subscribe({
        next: () => {
          this.isSaving.set(false);
        },
        error: (err) => {
          console.error('Error saving answer:', err);
          this.isSaving.set(false);
        },
      });
  }

  goToPreviousQuestion() {
    this.currentQuestionIndex.update((idx) => Math.max(0, idx - 1));
  }

  goToNextQuestion() {
    this.currentQuestionIndex.update((idx) =>
      Math.min(this.examItems().length - 1, idx + 1)
    );
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex.set(index);
  }

  async openSubmitModal() {
    this.showSubmitModal.set(true);
  }

  closeSubmitModal() {
    this.showSubmitModal.set(false);
  }

  async submitExam() {
    this.openSubmitModal();
  }

  private autoSubmit() {
    console.log('Auto-submitting due to time expiration');
    this.performSubmit();
  }

  performSubmit() {
    const exam = this.takenExam();
    if (!exam || this.wasSubmitted() || this.submitting()) return;

    this.submitting.set(true);
    this.closeSubmitModal();

    this.http
      .post(
        `${environment.apiBaseUrl}/student/taken-exams/${exam.id}/submit`,
        {}
      )
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.router.navigate(['/tabs/taken-exams']);
        },
        error: (err) => {
          this.error.set(err?.error?.message || 'Failed to submit exam');
          this.submitting.set(false);
        },
      });
  }

  getQuestionTypeLabel(type?: string): string {
    const labels: Record<string, string> = {
      mcq: 'Multiple Choice',
      truefalse: 'True/False',
      essay: 'Essay',
      fillblank: 'Fill in the Blank',
      shortanswer: 'Short Answer',
      matching: 'Matching',
    };
    return labels[type || ''] || type || 'Unknown';
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  }

  isAnswered(itemId: number): boolean {
    const ans = this.answers()[itemId];
    return ans !== undefined && ans !== null && ans !== '';
  }

  goBack() {
    this.router.navigate(['/tabs/taken-exams']);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }

    // Clear all pending save operations
    Object.values(this.savingTimeouts).forEach((handle) =>
      clearTimeout(handle)
    );
  }
}

// Interfaces
export interface ITakenExam {
  readonly id: number;
  readonly exam_id: number;
  readonly user_id: number;
  readonly started_at: string;
  readonly submitted_at: string | null;
  readonly status: string;
  readonly total_points: number;
  readonly created_at: string;
  readonly updated_at: string;
  readonly answers?: ITakenExamAnswer[];
  readonly exam?: IExam;
}

export interface IExam {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly starts_at: string;
  readonly ends_at: string;
  readonly year: string[];
  readonly sections: string[];
  readonly status: string;
  readonly total_points: number;
  readonly items_count: number;
  readonly items?: IExamItem[];
}

export interface IExamItem {
  readonly id: number;
  readonly exam_id: number;
  readonly type:
    | 'mcq'
    | 'truefalse'
    | 'shortanswer'
    | 'essay'
    | 'fillblank'
    | 'matching';
  readonly question: string;
  readonly points: number;
  readonly expected_answer: string | null;
  readonly answer: any;
  readonly options: IOption[] | null;
  readonly pairs?: IPair[] | null;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface IOption {
  readonly text: string;
  readonly correct: boolean;
}

export interface IPair {
  readonly left: string;
  readonly right: string;
}

export interface ITakenExamAnswer {
  readonly id: number;
  readonly taken_exam_id: number;
  readonly exam_item_id: number;
  readonly answer: any;
  readonly points_earned: number;
  readonly feedback: string | null;
  readonly created_at: string;
  readonly updated_at: string;
  readonly type?: string;
}
