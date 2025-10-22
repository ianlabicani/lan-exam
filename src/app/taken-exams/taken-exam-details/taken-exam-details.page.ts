import { ITakenExam } from './../taken-exams.page';
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
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
  IonItem,
  IonLabel,
  IonText,
  IonBadge,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  checkmarkCircleOutline,
  calendarOutline,
  closeCircleOutline,
  playOutline,
  timeOutline,
  helpCircleOutline,
  checkmarkDoneOutline,
  arrowForwardOutline,
  documentOutline,
} from 'ionicons/icons';
import { map, finalize } from 'rxjs';

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
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonIcon,
    IonSpinner,
    IonGrid,
    IonRow,
    IonCol,
    IonProgressBar,
    IonItem,
    IonLabel,
    IonText,
    IonBadge,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class TakenExamDetailsPage {
  private activatedRoute = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private router = inject(Router);

  takenExam = signal<ITakenExamDetails | null>(null);
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
      timeOutline,
      helpCircleOutline,
      checkmarkDoneOutline,
      arrowForwardOutline,
      documentOutline,
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
      .get<{ data: ITakenExamDetails }>(
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
        next: (data) => {
          console.log('Exam detail:', data);
          this.takenExam.set(data || null);
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
    const detail = this.takenExam();
    if (
      detail &&
      detail.total_points !== undefined &&
      detail.total_points !== null
    ) {
      return (detail.total_points / 100) * 100; // Adjust based on your total points scale
    }
    return 0;
  }

  goBack() {
    this.router.navigate(['/tabs/taken-exams']);
  }

  continueExam() {
    // Navigate to exam taking page
    const id = this.takenExam()?.id;
    if (id) {
      this.router.navigate(['/tabs/exams', id, 'take']);
    }
  }
}

export interface ITakenExamDetails {
  id: number;
  exam_id: number;
  user_id: number;
  started_at: Date;
  submitted_at: Date;
  status: string;
  total_points: number;
  created_at: Date;
  updated_at: Date;
  answers: Answer[];
}

export interface Answer {
  id: number;
  taken_exam_id: number;
  exam_item_id: number;
  answer: string;
  points_earned: number;
  feedback: null | string;
  created_at: Date;
  updated_at: Date;
}
