import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTakenExamPage } from './create-taken-exam.page';

describe('CreateTakenExamPage', () => {
  let component: CreateTakenExamPage;
  let fixture: ComponentFixture<CreateTakenExamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTakenExamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
