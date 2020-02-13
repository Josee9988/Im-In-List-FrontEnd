import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
/**
 * @author Borja Pérez Mullor <multibalcoy@gmail.com>
 */
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {

  }

  checkRole(Response: any) {
    if (Response.user.role === 3) {
      return true;
    } else {
      return false;
    }
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.userService.getDataUser().subscribe(Response => this.checkRole(Response));
    if (this.checkRole(this.userService.getDataUser().subscribe(Response)) === true) {
      return true;
    }
    return true;
  }
}

}
