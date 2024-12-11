import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!route.data['roles']) return true;

  return new Promise((resolve) => {
    authService.user.subscribe((user) => {
      if (!user){
        router.navigate(['login']);
        return resolve(false);
      }

      const isAllowed = route.data['roles'].includes(user.role);

      return resolve(isAllowed);
    });
  });
};
