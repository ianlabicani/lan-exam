import { Component, computed, input, Input } from '@angular/core';
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
  answer = input.required<Answer>();
  @Input() index: number = 0;

  isCorrect: boolean = false;
  correctAnswerText = computed(() => {
    const answerSig = this.answer();
    const correctOption = answerSig.item.options?.find((opt) => opt.correct);
    return correctOption ? correctOption.text : '';
  });

  constructor() {
    addIcons({ checkmarkCircleOutline, closeCircleOutline });
  }

  ngOnInit() {
    const answerSig = this.answer();
    // Find the correct answer from options
    const correctOption = answerSig.item.options?.find((opt) => opt.correct);
    this.isCorrect =
      answerSig.answer ===
      answerSig.item.options?.indexOf(correctOption!).toString();
  }

  getOptionStatus(optionText: string): 'correct' | 'selected' | 'neutral' {
    const answerSig = this.answer();

    const optionIndex =
      answerSig.item.options?.findIndex((opt) => opt.text === optionText) ?? -1;
    const userSelectedIndex = parseInt(answerSig.answer);

    if (optionIndex === userSelectedIndex) {
      return this.isCorrect ? 'correct' : 'selected';
    }
    return 'neutral';
  }
}
