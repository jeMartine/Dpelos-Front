import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {


  const loginService = inject(LoginService); 
  const router = inject(Router);
  
  if (loginService.isLoggedIn()) {
    return true; // Permite el acceso a la ruta
  } else {
    router.navigate(['/login']); // Redirige al login si no está autenticado
    return false; // Bloquea el acceso a la ruta
  }
};