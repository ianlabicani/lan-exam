import {
  Component,
  Input,
  Output,
  EventEmitter,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  signal,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonTextarea,
  IonText,
} from '@ionic/angular/standalone';
import { IExamItem } from '../create-taken-exam.page';

@Component({
  selector: 'app-exam-question',
  templateUrl: './exam-question.component.html',
  styleUrls: ['./exam-question.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonInput,
    IonTextarea,
    IonText,
  ],
})
export class ExamQuestionComponent {
  // Input signals
  readonly item = input<IExamItem | null>(null);
  readonly currentAnswer = input<any>(null);
  readonly index = input(0);
  readonly isReadonly = input(false);

  // Output
  readonly answerChange = output<any>();

  protected readonly letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  setMcq(idx: number) {
    if (!this.isReadonly()) {
      this.answerChange.emit(idx);
    }
  }

  setTrueFalse(value: boolean) {
    if (!this.isReadonly()) {
      this.answerChange.emit(value);
    }
  }

  onText(value: string) {
    if (!this.isReadonly()) {
      this.answerChange.emit(value);
    }
  }

  onEssay(value: string) {
    if (!this.isReadonly()) {
      this.answerChange.emit(value);
    }
  }

  setMatching(pairIndex: number, optionIndex: string) {
    if (!this.isReadonly()) {
      const matchingAnswers = this.currentAnswer() || {};
      matchingAnswers[pairIndex] = optionIndex
        ? parseInt(optionIndex, 10)
        : null;
      this.answerChange.emit(matchingAnswers);
    }
  }

  getCurrentAnswer(pairIndex: number): string {
    const itemValue = this.item();
    const currentAnswerValue = this.currentAnswer();
    if (!itemValue?.pairs || !currentAnswerValue) return '';
    const optionIndex = currentAnswerValue[pairIndex];
    if (optionIndex === null || optionIndex === undefined) return '';
    return itemValue.pairs[optionIndex]?.right || '';
  }

  countWords(text: string): number {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  }
}
