import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterconfirmComponent } from './enterconfirm.component';

describe('EnterconfirmComponent', () => {
  let component: EnterconfirmComponent;
  let fixture: ComponentFixture<EnterconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
