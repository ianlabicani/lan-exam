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
import { checkmarkCircleOutline, documentOutline } from 'ionicons/icons';
import { Answer } from '../taken-exam-details.page';

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
  answer = input.required<Answer>();
  index = input.required<number>();

  constructor() {
    addIcons({ checkmarkCircleOutline, documentOutline });
  }

  getWordCount(text: string): number {
    return text?.trim().split(/\s+/).length || 0;
  }
}
