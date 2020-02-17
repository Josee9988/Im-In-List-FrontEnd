import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { INavbarLinks } from './inavbar-links';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';
import { RefreshNavbarCommunication } from 'src/app/shared/services/communications/refresh-navbar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class NavbarComponent implements OnInit, OnDestroy {
  navbarLinks: Array<INavbarLinks>;
  private observableGetData: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(
    '(max-width: 859.99px) and (orientation: portrait), ' +
    '(max-width: 959.99px) and (orientation: landscape)')
    .pipe(map(result => result.matches), shareReplay());

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private snackbarDisplayerService: SnackbarDisplayerService,
    private refreshNavbarCommunication: RefreshNavbarCommunication,
    private userService: UserService) {
    this.refreshNavbarCommunication.subscribe(() => this.declareNavbarElements());
  }

  ngOnInit() {
    this.declareNavbarElements();
  }

  /**
   * Summary: creates the navbarlinks to be shown at the navbar. It is also called
   * when redeclaring the navbarlinks.
   */
  declareNavbarElements(): void {
    // default links
    this.navbarLinks = [
      { icon: 'post_add', field: 'Nueva lista', route: 'list', order: 1 },
      { icon: 'attach_money', field: 'Precios', route: 'pricing', order: 3 },
      { icon: 'contact_mail', field: 'Contacta', route: 'contact', order: 4 },
      { icon: 'supervised_user_circle', field: 'Sobre nosotros', route: 'about', order: 6 }];
    if (this.authService.hasToken()) { // THE USER IS LOGGED IN
      this.observableGetData = this.userService.getDataUser().subscribe(Response => {
        if (Response.user) {
          if (Response.user.role === 0) { // ADMIN
            this.navbarLinks.push(// add the missing ones in the right order
              { icon: 'person', field: 'Perfil', route: 'profile', order: 2 },
              { icon: 'how_to_reg', field: 'Admin', route: 'admin', order: 7 },
              { icon: 'exit_to_app', field: 'Salir', route: 'logout', order: 8, logout: true });
          } else if (Response.user.role > 0) { // LOGGED IN AS USERS
            this.navbarLinks.push( // add the missing ones in the right order
              { icon: 'person', field: 'Perfil', route: 'profile', order: 2 },
              { icon: 'exit_to_app', field: 'Salir', route: 'logout', order: 6, logout: true });
          }
        } else {
          this.navbarLinks.push(
            { icon: 'fingerprint', field: 'Inicio de sesión', route: 'login', order: 7 },
            { icon: 'person_add', field: 'Registro', route: 'register', order: 8 }
          );
        }
      });
    } else { // NOT LOGGED IN
      this.navbarLinks.push(
        { icon: 'fingerprint', field: 'Inicio de sesión', route: 'login', order: 7 },
        { icon: 'person_add', field: 'Registro', route: 'register', order: 8 }
      );
    }
  }

  /**
   * Summary: removes the authorization token, shows a message and redeclare the navbar elements.
   */
  logout(): void {
    if (this.authService.deleteAuthorizationToken()) {
      this.authService.deletePaypalToken();
      this.snackbarDisplayerService.openSnackBar('¡Sesión cerrada!', SnackBarErrorType.success);
      this.declareNavbarElements();
      window.location.href = '/home';
    }
  }

  ngOnDestroy(): void {
    if (this.observableGetData) {
      this.observableGetData.unsubscribe();
    }
  }
}
