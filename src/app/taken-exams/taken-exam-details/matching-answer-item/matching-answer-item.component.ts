import { Component, input, computed } from '@angular/core';
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
  readonly answerSig = input.required<Answer>();
  readonly indexSig = input.required<number>();

  constructor() {
    addIcons({ checkmarkCircleOutline, closeCircleOutline });
  }

  readonly userMatchesSig = computed(() => {
    const answer = this.answerSig();
    try {
      // Parse the answer which contains indices like "[0,1]"
      const indices = JSON.parse(answer.answer) as number[];
      const pairs = answer.item?.pairs || [];
      // Map indices to actual pairs
      return indices.map((idx) => pairs[idx]).filter((p) => p);
    } catch {
      return [];
    }
  });

  readonly correctMatchCountSig = computed(() => {
    const userMatches = this.userMatchesSig();
    const expectedPairs = this.answerSig().item?.pairs || [];

    return userMatches.filter((userMatch) =>
      expectedPairs.some(
        (expectedPair) =>
          expectedPair.left === userMatch.left &&
          expectedPair.right === userMatch.right
      )
    ).length;
  });

  isMatchCorrect(match: Pair): boolean {
    const expectedPairs = this.answerSig().item?.pairs || [];
    return expectedPairs.some(
      (p) => p.left === match.left && p.right === match.right
    );
  }
}
