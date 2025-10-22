import {
  Component,
  Input,
  Output,
  EventEmitter,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-submit-modal',
  templateUrl: './submit-modal.component.html',
  styleUrls: ['./submit-modal.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonText,
  ],
})
export class SubmitModalComponent {
  @Input() isOpen: boolean = false;
  @Input() answeredCount: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() isSubmitting: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<void>();

  get unansweredCount(): number {
    return this.totalQuestions - this.answeredCount;
  }

  handleCancel() {
    this.onClose.emit();
  }

  handleSubmit() {
    this.onSubmit.emit();
  }
}
