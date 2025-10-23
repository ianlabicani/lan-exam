import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModal, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-submit-modal',
  templateUrl: './submit-modal.component.html',
  styleUrls: ['./submit-modal.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonModal, IonButton],
})
export class SubmitModalComponent {
  // Input signals
  readonly isOpenSig = input(false);
  readonly answeredCountSig = input(0);
  readonly totalQuestionsSig = input(0);
  readonly isSubmittingSig = input(false);

  // Output
  readonly onCloseSig = output<void>();
  readonly onSubmitSig = output<void>();

  // Computed
  readonly unansweredCountSig = computed(() => {
    return this.totalQuestionsSig() - this.answeredCountSig();
  });

  handleCancel() {
    this.onCloseSig.emit();
  }

  handleSubmit() {
    this.onSubmitSig.emit();
  }
}
