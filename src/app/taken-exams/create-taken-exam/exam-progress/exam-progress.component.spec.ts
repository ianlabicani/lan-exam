import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExamProgressComponent } from './exam-progress.component';

describe('ExamProgressComponent', () => {
  let component: ExamProgressComponent;
  let fixture: ComponentFixture<ExamProgressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ExamProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
