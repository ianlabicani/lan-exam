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
import { checkmarkCircleOutline, documentOutline } from 'ionicons/icons';

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
  selector: 'app-essay-answer-item',
  templateUrl: './essay-answer-item.component.html',
  styleUrls: ['./essay-answer-item.component.scss'],
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
export class EssayAnswerItemComponent {
  @Input() answer!: Answer;
  @Input() index: number = 0;
  @Input() question?: string | null;
  @Input() maxPoints?: number | null;

  constructor() {
    addIcons({ checkmarkCircleOutline, documentOutline });
  }

  getWordCount(text: string): number {
    return text?.trim().split(/\s+/).length || 0;
  }
}
