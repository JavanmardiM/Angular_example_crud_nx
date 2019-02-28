import { async, TestBed } from '@angular/core/testing';
import { TavsysPersianDatepcikerModule } from './tavsys-persian-datepicker.module';

describe('TavsysPersianDatepcikerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TavsysPersianDatepcikerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TavsysPersianDatepcikerModule).toBeDefined();
  });
});
