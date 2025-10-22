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

export interface Option {
  text: string;
  correct: boolean;
}

@Component({
  selector: 'app-mcq-answer-item',
  templateUrl: './mcq-answer-item.component.html',
  styleUrls: ['./mcq-answer-item.component.scss'],
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
export class McqAnswerItemComponent {
  @Input() answer!: Answer;
  @Input() index: number = 0;
  @Input() question?: string | null;
  @Input() options?: Option[] | null;
  @Input() maxPoints?: number | null;

  isCorrect: boolean = false;

  constructor() {
    addIcons({ checkmarkCircleOutline, closeCircleOutline });
  }

  ngOnInit() {
    // Find the correct answer from options
    const correctOption = this.options?.find((opt) => opt.correct);
    this.isCorrect =
      this.answer.answer === this.options?.indexOf(correctOption!).toString();
  }

  getOptionStatus(optionText: string): 'correct' | 'selected' | 'neutral' {
    const optionIndex =
      this.options?.findIndex((opt) => opt.text === optionText) ?? -1;
    const userSelectedIndex = parseInt(this.answer.answer);

    if (optionIndex === userSelectedIndex) {
      return this.isCorrect ? 'correct' : 'selected';
    }
    return 'neutral';
  }

  getCorrectAnswer(): string {
    if (!this.options) return 'N/A';
    const correctOption = this.options.find((opt) => opt.correct);
    return correctOption?.text || 'N/A';
  }
}
