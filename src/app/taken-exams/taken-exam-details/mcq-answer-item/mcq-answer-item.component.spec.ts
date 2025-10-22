import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { McqAnswerItemComponent } from './mcq-answer-item.component';

describe('McqAnswerItemComponent', () => {
  let component: McqAnswerItemComponent;
  let fixture: ComponentFixture<McqAnswerItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [McqAnswerItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(McqAnswerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
