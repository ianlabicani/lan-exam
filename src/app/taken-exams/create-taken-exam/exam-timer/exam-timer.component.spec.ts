import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExamTimerComponent } from './exam-timer.component';

describe('ExamTimerComponent', () => {
  let component: ExamTimerComponent;
  let fixture: ComponentFixture<ExamTimerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ExamTimerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
