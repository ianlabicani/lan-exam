import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonProgressBar, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-exam-progress',
  templateUrl: './exam-progress.component.html',
  styleUrls: ['./exam-progress.component.scss'],
  standalone: true,
  imports: [CommonModule, IonProgressBar, IonText],
})
export class ExamProgressComponent {
  @Input() answered: number = 0;
  @Input() total: number = 0;

  get percentage(): number {
    return this.total > 0 ? (this.answered / this.total) * 100 : 0;
  }
}
