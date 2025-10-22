import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShortAnswerItemComponent } from './short-answer-item.component';

describe('ShortAnswerItemComponent', () => {
  let component: ShortAnswerItemComponent;
  let fixture: ComponentFixture<ShortAnswerItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ShortAnswerItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShortAnswerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
