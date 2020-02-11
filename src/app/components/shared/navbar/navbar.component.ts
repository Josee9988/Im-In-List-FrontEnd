import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { INavbarLinks } from './inavbar-links';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class NavbarComponent implements OnInit {
  navbarLinks: Array<INavbarLinks>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(
    '(max-width: 859.99px) and (orientation: portrait), ' +
    '(max-width: 959.99px) and (orientation: landscape)')
    .pipe(map(result => result.matches), shareReplay());

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.navbarLinks = [
      { icon: 'post_add', field: 'Nueva lista', route: 'newList', order: 1 },
      { icon: 'person', field: 'Perfil', route: 'profile', order: 2 },
      { icon: 'attach_money', field: 'Precios', route: 'pricing', order: 3 },
      { icon: 'contact_mail', field: 'Contacta', route: 'contact', order: 4 },
      { icon: 'supervised_user_circle', field: 'Sobre nosotros', route: 'about', order: 5 },
      { icon: 'fingerprint', field: 'Inicio de sesión', route: 'login', order: 6 },
      { icon: 'how_to_reg', field: 'Registro', route: 'register', order: 7 },
      { icon: 'exit_to_app', field: 'Salir', route: 'logout', order: 8 }];
  }

}
