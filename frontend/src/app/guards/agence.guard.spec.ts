import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { agenceGuard } from './agence.guard';

describe('agenceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => agenceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
