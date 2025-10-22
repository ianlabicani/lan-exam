import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrueFalseAnswerItemComponent } from './true-false-answer-item.component';

describe('TrueFalseAnswerItemComponent', () => {
  let component: TrueFalseAnswerItemComponent;
  let fixture: ComponentFixture<TrueFalseAnswerItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TrueFalseAnswerItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrueFalseAnswerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
