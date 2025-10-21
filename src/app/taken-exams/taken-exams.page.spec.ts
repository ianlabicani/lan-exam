import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TakenExamsPage } from './taken-exams.page';

describe('TakenExamsPage', () => {
  let component: TakenExamsPage;
  let fixture: ComponentFixture<TakenExamsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TakenExamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
