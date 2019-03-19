import { async, TestBed } from '@angular/core/testing';
import { PromptModule } from './prompt.module';

describe('PromptModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PromptModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PromptModule).toBeDefined();
  });
});
