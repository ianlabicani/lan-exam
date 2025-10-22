import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';

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

@Component({
  selector: 'app-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
  ],
})
export class AnswerItemComponent {
  @Input() answer!: Answer;
  @Input() index: number = 0;
  @Input() isCorrect: boolean = false;
  @Input() maxPoints?: number | null;

  constructor() {
    addIcons({ checkmarkCircleOutline, closeCircleOutline });
  }
}
