import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceconfirmComponent } from './absenceconfirm.component';

describe('AbsenceconfirmComponent', () => {
  let component: AbsenceconfirmComponent;
  let fixture: ComponentFixture<AbsenceconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
