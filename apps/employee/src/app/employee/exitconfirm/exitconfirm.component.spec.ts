import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitconfirmComponent } from './exitconfirm.component';

describe('ExitconfirmComponent', () => {
  let component: ExitconfirmComponent;
  let fixture: ComponentFixture<ExitconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
