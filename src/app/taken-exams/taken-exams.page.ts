import { Component, inject, OnInit, signal } from '@angular/core';
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
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  hourglassOutline,
  documentOutline,
  calendarOutline,
  checkmarkCircleOutline,
  eyeOutline,
  arrowForwardOutline,
} from 'ionicons/icons';
import { map, finalize } from 'rxjs';

@Component({
  selector: 'app-taken-exams',
  templateUrl: './taken-exams.page.html',
  styleUrls: ['./taken-exams.page.scss'],
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
    IonGrid,
    IonRow,
    IonCol,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class TakenExamsPage {
  private http = inject(HttpClient);

  takenExams = signal<ITakenExamExtended[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ionViewWillEnter() {
    this.loadTakenExams();
  }

  constructor() {
    addIcons({
      hourglassOutline,
      documentOutline,
      calendarOutline,
      checkmarkCircleOutline,
      eyeOutline,
      arrowForwardOutline,
    });
  }

  loadTakenExams() {
    this.loading.set(true);
    this.error.set(null);
    this.http
      .get<{ data: ITakenExam[] }>(
        `${environment.apiBaseUrl}/student/taken-exams`
      )
      .pipe(
        map((res) =>
          res.data.map((exam) => ({
            ...exam,
            statusLabel: this.getStatusLabel(exam.status),
            statusColor: this.getStatusColor(exam.status),
            percentage: this.getPercentage(exam),
          }))
        ),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: (examsWithMetadata) => {
          console.log('Exams data:', examsWithMetadata);
          this.takenExams.set(examsWithMetadata);
        },
        error: (error) => {
          console.error('Error fetching exams data:', error);
          this.error.set(error?.error?.message || 'Failed to load exams');
        },
      });
  }

  private getPercentage(taken: ITakenExam): number {
    if (taken.exam?.total_points && taken.total_points) {
      return parseFloat(
        ((taken.total_points / taken.exam.total_points) * 100).toFixed(2)
      );
    }
    return 0;
  }

  private getStatusColor(status: string): string {
    switch (status) {
      case 'ongoing':
        return 'warning';
      case 'submitted':
        return 'success';
      default:
        return 'primary';
    }
  }

  private getStatusLabel(status: string): string {
    switch (status) {
      case 'ongoing':
        return 'In Progress';
      case 'submitted':
        return 'Submitted';
      default:
        return 'Graded';
    }
  }
}
export interface ITakenExamExtended extends ITakenExam {
  statusLabel: string;
  statusColor: string;
  percentage: number;
}

export interface ITakenExam {
  id: number;
  exam_id: number;
  user_id: number;
  started_at: Date;
  submitted_at: Date;
  status: string;
  total_points: number;
  created_at: Date;
  updated_at: Date;
  answers_count: number;
  exam: Exam;
}

export interface Exam {
  id: number;
  title: string;
  description: string;
  starts_at: Date;
  ends_at: Date;
  year: string[];
  sections: string[];
  status: string;
  total_points: number;
  tos: To[];
  created_at: Date;
  updated_at: Date;
  items_count: number;
}

export interface To {
  topic: string;
  outcomes: any[];
  time_allotment: number;
  no_of_items: number;
  distribution: Distribution;
}

export interface Distribution {
  easy: Difficult;
  moderate: Difficult;
  difficult: Difficult;
}

export interface Difficult {
  allocation: number;
  placement: any[];
}
