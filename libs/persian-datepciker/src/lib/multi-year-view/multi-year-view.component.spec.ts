import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiYearViewComponent } from './multi-year-view.component';

describe('MultiYearViewComponent', () => {
  let component: MultiYearViewComponent;
  let fixture: ComponentFixture<MultiYearViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiYearViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiYearViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
