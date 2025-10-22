import { Component, input, Input } from '@angular/core';
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
import { Answer, Pair } from '../taken-exam-details.page';

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
  answer = input.required<Answer>();
  index = input.required<number>();

  constructor() {
    addIcons({ checkmarkCircleOutline, closeCircleOutline });
  }

  parseMatchingAnswer(): Pair[] {
    const answer = this.answer();

    try {
      return JSON.parse(answer.answer) || [];
    } catch {
      return [];
    }
  }

  getCorrectMatches(): number {
    const userMatches = this.parseMatchingAnswer();
    console.log(userMatches);
    const parsedPairs = JSON.parse(
      JSON.stringify(this.answer().item?.pairs || [])
    );

    console.log(parsedPairs);

    return (
      userMatches.filter((m) =>
        parsedPairs.some((p: any) => p.left === m.left && p.right === m.right)
      ).length || 0
    );
  }

  isMatchCorrect(match: Pair): boolean {
    const parsedPairs = JSON.parse(
      JSON.stringify(this.answer().item?.pairs || [])
    );

    return (
      parsedPairs?.some(
        (p: any) => p.left === match.left && p.right === match.right
      ) || false
    );
  }
}
