import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EssayAnswerItemComponent } from './essay-answer-item.component';

describe('EssayAnswerItemComponent', () => {
  let component: EssayAnswerItemComponent;
  let fixture: ComponentFixture<EssayAnswerItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EssayAnswerItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EssayAnswerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
