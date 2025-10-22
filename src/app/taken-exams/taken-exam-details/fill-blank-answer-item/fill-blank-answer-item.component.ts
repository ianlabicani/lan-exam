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
  answer = input.required<Answer>();
  index = input.required<number>();

  isCorrect = computed(() => {
    const answer = this.answer();
    return (
      answer.answer?.toLowerCase().trim() ===
      answer.answer?.toLowerCase().trim()
    );
  });

  constructor() {
    addIcons({ checkmarkCircleOutline, closeCircleOutline });
  }

  ngOnInit() {
    const answer = this.answer();
  }
}
