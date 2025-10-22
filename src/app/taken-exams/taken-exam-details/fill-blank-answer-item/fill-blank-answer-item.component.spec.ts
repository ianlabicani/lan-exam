import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FillBlankAnswerItemComponent } from './fill-blank-answer-item.component';

describe('FillBlankAnswerItemComponent', () => {
  let component: FillBlankAnswerItemComponent;
  let fixture: ComponentFixture<FillBlankAnswerItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FillBlankAnswerItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FillBlankAnswerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
