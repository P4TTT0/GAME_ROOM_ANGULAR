import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  await authService.reLogin();

  if (authService.logueado) {
    return true; // 
  } else {
    return false;
  }
};



