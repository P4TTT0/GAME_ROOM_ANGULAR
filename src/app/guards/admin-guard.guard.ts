import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuardGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  if (authService.userName == "admin") {
    return true; 
  } else {
    return false;
  }
};
