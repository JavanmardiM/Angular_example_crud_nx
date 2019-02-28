import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersianCalendarComponent } from './persian-calendar.component';

describe('PersianCalendarComponent', () => {
  let component: PersianCalendarComponent;
  let fixture: ComponentFixture<PersianCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersianCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersianCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
