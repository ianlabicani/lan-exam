import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { Answer } from '../taken-exam-details.page';

@Component({
  selector: 'app-short-answer-item',
  templateUrl: './short-answer-item.component.html',
  styleUrls: ['./short-answer-item.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
  ],
})
export class ShortAnswerItemComponent {
  answer = input.required<Answer>();
  index = input.required<number>();

  constructor() {
    addIcons({ checkmarkCircleOutline, closeCircleOutline });
  }
}
