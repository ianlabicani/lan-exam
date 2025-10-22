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
import { Answer } from '../taken-exam-details.page';

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
  answer = input.required<Answer>();
  index = input.required<number>();
  isCorrect: boolean = false;

  constructor() {
    addIcons({ checkmarkCircleOutline, closeCircleOutline });
  }

  ngOnInit() {
    const answer = this.answer();
    // Convert 1/true to boolean for comparison
    const userAnswer =
      answer.answer === '1' || answer.answer?.toLowerCase() === 'true';
    const expectedAnswer =
      answer.answer === '1' || answer.answer?.toLowerCase() === 'true';
    this.isCorrect = userAnswer === expectedAnswer;
  }

  getAnswerDisplay(value: string): string {
    if (!value) return 'N/A';
    return value === '1' || value.toLowerCase() === 'true' ? 'True' : 'False';
  }
}
