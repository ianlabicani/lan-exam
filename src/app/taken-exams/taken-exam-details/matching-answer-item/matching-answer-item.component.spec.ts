import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchingAnswerItemComponent } from './matching-answer-item.component';

describe('MatchingAnswerItemComponent', () => {
  let component: MatchingAnswerItemComponent;
  let fixture: ComponentFixture<MatchingAnswerItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatchingAnswerItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchingAnswerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
