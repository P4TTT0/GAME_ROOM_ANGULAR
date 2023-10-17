import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).logueado;
};


