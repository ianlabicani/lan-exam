import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonIcon,
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
  selector: 'app-true-false-answer-item',
  templateUrl: './true-false-answer-item.component.html',
  styleUrls: ['./true-false-answer-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonIcon,
  ],
})
export class TrueFalseAnswerItemComponent {
  @Input() answer!: Answer;
  @Input() index: number = 0;
  @Input() question?: string | null;
  @Input() expectedAnswer?: string | null;
  @Input() maxPoints?: number | null;

  isCorrect: boolean = false;

  constructor() {
    addIcons({ checkmarkCircleOutline, closeCircleOutline });
  }

  ngOnInit() {
    // Convert 1/true to boolean for comparison
    const userAnswer =
      this.answer.answer === '1' ||
      this.answer.answer?.toLowerCase() === 'true';
    const expectedAnswer =
      this.expectedAnswer === '1' ||
      this.expectedAnswer?.toLowerCase() === 'true';
    this.isCorrect = userAnswer === expectedAnswer;
  }

  getAnswerDisplay(value: string): string {
    if (!value) return 'N/A';
    return value === '1' || value.toLowerCase() === 'true' ? 'True' : 'False';
  }
}
