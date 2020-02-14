import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../../shared/services/user.service';
import { AuthService } from './../services/auth.service';


@Injectable({
  providedIn: 'root'
})
/**
 * @author Borja Pérez Mullor <multibalcoy@gmail.com>
 */
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {

  }

  async canActivate(): Promise<boolean> {

    this.checkAdmin().then(() => {
      return true;
    })
      .catch(() => {
      });

    return true;
  }

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
