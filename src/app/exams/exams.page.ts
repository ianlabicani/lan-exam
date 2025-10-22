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
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
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

  startExam(exam: IExam) {
    if (exam.status === 'ongoing') {
      this.router.navigate(['/tabs/exams', exam.id, 'take']);
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
