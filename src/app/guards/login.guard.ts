import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  // Espera a que se complete la función de autenticación reLogin
  await authService.reLogin();

  // Verifica si el usuario está autenticado
  if (authService.logueado) {
    return true; // El usuario está autenticado y puede acceder a la ruta
  } else {
    // El usuario no está autenticado, redirige a la página de inicio de sesión o a donde desees.
    // Por ejemplo, puedes redirigirlo a la página de inicio.
    // Debes importar el router en tu guard y utilizarlo para la redirección.
    // import { Router } from '@angular/router';
    // const router = inject(Router);
    // router.navigate(['/login']); // Redirigir a la página de inicio de sesión
    return false;
  }
};



