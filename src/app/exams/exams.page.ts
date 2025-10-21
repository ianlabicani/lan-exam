import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    CommonModule,
    FormsModule,
  ],
})
export class ExamsPage {
  private http = inject(HttpClient);

  constructor() {}

  ionViewWillEnter() {
    this.loadExams();
  }

  loadExams() {
    console.log('init');

    this.http.get(`${environment.apiBaseUrl}/student/exams`).subscribe({
      next: (data) => {
        console.log('Exams data:', data);
      },
      error: (error) => {
        console.error('Error fetching exams data:', error);
      },
    });
  }
}
