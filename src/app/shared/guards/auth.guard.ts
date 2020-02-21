import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
/**
 * @author Borja Pérez Mullor <multibalcoy@gmail.com>
 */
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Summary: returns true or false depending if the user is logged in or not.
   */
  canActivate(): boolean {
    if (this.authService.hasToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
