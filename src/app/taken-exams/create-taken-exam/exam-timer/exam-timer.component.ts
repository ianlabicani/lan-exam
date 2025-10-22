import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-exam-timer',
  templateUrl: './exam-timer.component.html',
  styleUrls: ['./exam-timer.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonBadge],
})
export class ExamTimerComponent {
  @Input() remainingTime: number = 0;

  constructor() {
    addIcons({ timeOutline });
  }

  get isLowTime(): boolean {
    return this.remainingTime > 0 && this.remainingTime <= 300; // 5 minutes
  }

  get isCritical(): boolean {
    return this.remainingTime > 0 && this.remainingTime <= 60; // 1 minute
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(
        secs
      ).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  }
}
