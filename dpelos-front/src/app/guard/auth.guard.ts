import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {


  const loginService = inject(LoginService); 
  const router = inject(Router);
  
  const expectedType = route.data['expectedType']; // Obtiene el tipo de usuario esperado de la ruta

  if (expectedType === 'vet' && loginService.isLoggedIn('isVetLogged')) {
    return true; // Permite acceso a las rutas para veterinario
  } else if (expectedType === 'dueno' && loginService.isLoggedIn('isDuenoLogged')) {
    return true; // Permite acceso a las rutas para dueño
  } else {
    router.navigate(['/login']); // Redirige al login si no está autenticado o no tiene el tipo adecuado
    return false; // Bloquea el acceso a la ruta
  }
};