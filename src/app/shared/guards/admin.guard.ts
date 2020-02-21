import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
/**
 * @author Borja Pérez Mullor <multibalcoy@gmail.com>
 */
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  /**
   * Summary: returns true or false if the logged user is admin.
   */
  async canActivate(): Promise<boolean> {
    this.checkAdmin().then(() => {
      return true;
    });
    return true;
  }

  /**
   * Summary: returns true or false if the logged user is admin. Invoked by; canActivate.
   */
  async checkAdmin() {
    if (this.authService.hasToken()) {
      this.userService.getDataUser().subscribe(Response => {
        if (Response.user.role !== 0) {
          this.router.navigate(['/notAllowed']);
          return false;
        } else {
          return true;
        }
      });
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}
