import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubmitModalComponent } from './submit-modal.component';

describe('SubmitModalComponent', () => {
  let component: SubmitModalComponent;
  let fixture: ComponentFixture<SubmitModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SubmitModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
