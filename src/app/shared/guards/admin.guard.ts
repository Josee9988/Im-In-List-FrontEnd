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

  self = this;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.authService.hasToken()) {
      this.userService.getDataUser().subscribe(Response);

      if (self.Response.user.role != 3) {
        this.router.navigate(['/notAllow']);
        return false;
      } else {
        return true;
      }

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
