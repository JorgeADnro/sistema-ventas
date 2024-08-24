import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../pages/auth/services/auth.service';
import { map, take } from 'rxjs';

export const checkSessionGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);

  return authService.token$.pipe(
    take(1),
    map(token => {
      if(token) return true;

      // Redirect a login
      inject(Router).createUrlTree(['/login']);
      return false;
    })
  );

};
