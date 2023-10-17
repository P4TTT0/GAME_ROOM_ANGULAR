import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginDeactivateGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return inject(AuthService).logueado;
};
