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
  selector: 'app-fill-blank-answer-item',
  templateUrl: './fill-blank-answer-item.component.html',
  styleUrls: ['./fill-blank-answer-item.component.scss'],
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
export class FillBlankAnswerItemComponent {
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
    this.isCorrect =
      this.answer.answer?.toLowerCase().trim() ===
      this.expectedAnswer?.toLowerCase().trim();
  }
}
