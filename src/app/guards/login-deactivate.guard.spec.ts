import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { loginDeactivateGuard } from './login-deactivate.guard';

describe('loginDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
