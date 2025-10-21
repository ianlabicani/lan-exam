import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSpinner,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  checkmarkCircleOutline,
  calendarOutline,
  closeCircleOutline,
  playOutline,
} from 'ionicons/icons';
import { map, finalize } from 'rxjs';

interface ExamQuestion {
  id: number;
  question: string;
  answer: string;
  user_answer: string;
  is_correct: boolean;
  points: number;
}

interface TakenExamDetail {
  id: number;
  exam_id: number;
  user_id: number;
  started_at: Date;
  submitted_at: Date;
  status: string;
  total_points: number;
  questions: ExamQuestion[];
  exam: {
    id: number;
    title: string;
    total_points: number;
  };
}

@Component({
  selector: 'app-taken-exam-details',
  templateUrl: './taken-exam-details.page.html',
  styleUrls: ['./taken-exam-details.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonSpinner,
    CommonModule,
    FormsModule,
  ],
})
export class TakenExamDetailsPage {
  private activatedRoute = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private router = inject(Router);

  examDetail = signal<TakenExamDetail | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  isContinueMode = signal(false);

  constructor() {
    addIcons({
      arrowBackOutline,
      checkmarkCircleOutline,
      calendarOutline,
      closeCircleOutline,
      playOutline,
    });
  }

  ionViewWillEnter() {
    this.loadExamDetail();
  }

  ngOnInit() {}

  loadExamDetail() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(id);

    const isContinue = this.activatedRoute.snapshot.url.some(
      (segment) => segment.path === 'continue'
    );

    this.isContinueMode.set(isContinue);

    if (!id) {
      this.error.set('Exam ID not found');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<{ data: TakenExamDetail }>(
        `${environment.apiBaseUrl}/student/taken-exams/${id}`
      )
      .pipe(
        map((res) => {
          console.log(res);

          return res.data;
        }),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: (detail) => {
          console.log('Exam detail:', detail);
          this.examDetail.set(detail);
        },
        error: (error) => {
          console.error('Error fetching exam detail:', error);
          this.error.set(
            error?.error?.message || 'Failed to load exam details'
          );
        },
      });
  }

  getPercentage(): number {
    const detail = this.examDetail();
    if (
      detail &&
      detail.exam?.total_points &&
      detail.total_points !== undefined
    ) {
      return (detail.total_points / detail.exam.total_points) * 100;
    }
    return 0;
  }

  getCorrectAnswers(): number {
    const detail = this.examDetail();
    if (!detail?.questions) return 0;
    return detail.questions.filter((q) => q.is_correct).length;
  }

  goBack() {
    this.router.navigate(['/tabs/taken-exams']);
  }

  continueExam() {
    // Navigate to exam taking page
    const id = this.examDetail()?.id;
    if (id) {
      this.router.navigate(['/tabs/exams', id, 'take']);
    }
  }
}
