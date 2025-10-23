import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonBadge,
  IonSpinner,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  playOutline,
  timeOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  helpCircleOutline,
} from 'ionicons/icons';
import { map, finalize } from 'rxjs';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.page.html',
  styleUrls: ['./exams.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonIcon,
    IonBadge,
    IonSpinner,
    CommonModule,
    FormsModule,
    IonRouterLink,
    RouterLink,
  ],
})
export class ExamsPage {
  private http = inject(HttpClient);
  private router = inject(Router);

  exams = signal<IExam[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    addIcons({
      playOutline,
      timeOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      helpCircleOutline,
    });
  }

  ionViewWillEnter() {
    this.loadExams();
  }

  loadExams() {
    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<{ data: IExam[] }>(`${environment.apiBaseUrl}/student/exams`)
      .pipe(
        map((res) => {
          return res;
        }),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: (res) => {
          // console.log('Exams data:', data);
          this.exams.set(res.data || []);
        },
        error: (error) => {
          console.error('Error fetching exams data:', error);
          this.error.set(error?.error?.message || 'Failed to load exams');
        },
      });
  }

  takeExam(examId: number) {
    this.http
      .get<{ data: any; taken_exam_id?: number }>(
        `${environment.apiBaseUrl}/student/taken-exams/create`,
        { params: { exam_id: examId } }
      )
      .subscribe({
        next: (res) => {
          console.log(res);

          // Handle both response formats from the API
          let takenExamId: number | undefined;

          if (res.data?.taken_exam?.id) {
            // New exam created: data.taken_exam.id
            takenExamId = res.data.taken_exam.id;
          } else if (res.taken_exam_id) {
            // Existing exam in progress: taken_exam_id
            takenExamId = res.taken_exam_id;
          }

          if (takenExamId) {
            this.router.navigate(['tabs/taken-exams', takenExamId, 'create']);
          } else {
            console.error('No taken exam ID in response:', res);
          }
        },
        error: (err) => {
          console.error('Error starting exam:', err);
        },
      });
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'ongoing':
        return 'play-outline';
      case 'completed':
        return 'checkmark-circle-outline';
      case 'pending':
        return 'help-circle-outline';
      default:
        return 'help-circle-outline';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'ongoing':
        return 'warning';
      case 'completed':
        return 'success';
      case 'pending':
        return 'medium';
      default:
        return 'medium';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

export interface IExam {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly starts_at: string;
  readonly ends_at: string;
  readonly year: string[];
  readonly sections: string[];
  readonly status: 'pending' | 'ongoing' | 'completed';
  readonly total_points: number;
  readonly tos: ITopicOutcome[];
  readonly created_at: string;
  readonly updated_at: string;
  readonly items_count: number;
  readonly taken_exam: ITakenExamRef | null;
  readonly action: 'start' | 'continue' | 'unavailable';
}

export interface ITopicOutcome {
  readonly topic: string;
  readonly outcomes: string[];
  readonly time_allotment: number;
  readonly no_of_items: number;
  readonly distribution: {
    readonly easy: { allocation: number; placement: any[] };
    readonly moderate: { allocation: number; placement: any[] };
    readonly difficult: { allocation: number; placement: any[] };
  };
}

export interface ITakenExamRef {
  readonly id: number;
  readonly status: string;
}
