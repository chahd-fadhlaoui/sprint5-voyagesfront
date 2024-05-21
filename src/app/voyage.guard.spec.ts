import { TestBed } from '@angular/core/testing';

import { VoyageGuard } from './voyage.guard';

describe('VoyageGuard', () => {
  let guard: VoyageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VoyageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
