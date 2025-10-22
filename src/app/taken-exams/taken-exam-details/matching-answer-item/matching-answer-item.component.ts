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

export interface MatchPair {
  left: string;
  right: string;
}

@Component({
  selector: 'app-matching-answer-item',
  templateUrl: './matching-answer-item.component.html',
  styleUrls: ['./matching-answer-item.component.scss'],
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
export class MatchingAnswerItemComponent {
  @Input() answer!: Answer;
  @Input() index: number = 0;
  @Input() question?: string | null;
  @Input() pairs?: MatchPair[] | null;
  @Input() maxPoints?: number | null;

  constructor() {
    addIcons({ checkmarkCircleOutline, closeCircleOutline });
  }

  parseMatchingAnswer(): MatchPair[] {
    try {
      return JSON.parse(this.answer.answer) || [];
    } catch {
      return [];
    }
  }

  getCorrectMatches(): number {
    const userMatches = this.parseMatchingAnswer();
    return (
      userMatches.filter((m) =>
        this.pairs?.some((p) => p.left === m.left && p.right === m.right)
      ).length || 0
    );
  }

  isMatchCorrect(match: MatchPair): boolean {
    return (
      this.pairs?.some(
        (p) => p.left === match.left && p.right === match.right
      ) || false
    );
  }
}
