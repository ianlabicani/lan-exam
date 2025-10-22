import {
  Component,
  Input,
  Output,
  EventEmitter,
  CUSTOM_ELEMENTS_SCHEMA,
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
  IonRadio,
  IonRadioGroup,
  IonToggle,
  IonLabel,
  IonButton,
  IonText,
  IonIcon,
  IonNote,
  IonItem,
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
    IonRadio,
    IonRadioGroup,
    IonLabel,
    IonButton,
    IonText,
    IonNote,
    IonItem,
  ],
})
export class ExamQuestionComponent {
  @Input() item: IExamItem | null = null;
  @Input() currentAnswer: any = null;
  @Input() index: number = 0;
  @Input() isReadonly: boolean = false;
  @Output() answerChange = new EventEmitter<any>();

  onAnswerChange(value: any) {
    if (!this.isReadonly) {
      this.answerChange.emit(value);
    }
  }

  getTypeLabel(type?: string): string {
    const labels: Record<string, string> = {
      mcq: 'Multiple Choice',
      truefalse: 'True/False',
      essay: 'Essay',
      fillblank: 'Fill in the Blank',
      shortanswer: 'Short Answer',
      matching: 'Matching',
    };
    return labels[type || ''] || type || 'Unknown';
  }

  countWords(text: string): number {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  }
}
