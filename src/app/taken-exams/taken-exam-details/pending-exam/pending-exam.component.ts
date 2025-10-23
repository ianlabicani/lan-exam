import { DatePipe } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonIcon,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
} from '@ionic/angular/standalone';
import { ITakenExamDetails } from '../taken-exam-details.page';

@Component({
  selector: 'app-pending-exam',
  templateUrl: './pending-exam.component.html',
  styleUrls: ['./pending-exam.component.scss'],
  imports: [
    IonCardContent,
    IonCol,
    IonRow,
    IonGrid,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonButton,
    IonIcon,
    DatePipe,
    RouterLink,
  ],
})
export class PendingExamComponent implements OnInit {
  takenExam = input.required<ITakenExamDetails>();

  action = input.required<
    'unavailable' | 'pending' | 'available' | 'unknown'
  >();
  constructor() {}

  ngOnInit() {}
}
