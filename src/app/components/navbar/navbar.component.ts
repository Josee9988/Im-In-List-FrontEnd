import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


interface NavbarLinks {
  /**
   * Name of the icon of the material icons of google.
   */
  icon: string;
  /**
   * Name of the field, the text that will be displayed.
   */
  field: string;
  /**
   * Name of the route that references.
   */
  route: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarLinks: Array<NavbarLinks> = [
    { icon: 'home', field: 'Inicio', route: 'home' },
    { icon: 'person', field: 'Perfil', route: 'profile' },
    { icon: 'attach_money', field: 'Precios', route: 'pricing' },
    { icon: 'supervised_user_circle', field: 'Sobre nosotros', route: 'about' },
    { icon: 'contact_mail', field: 'contacta', route: 'contact' },
    { icon: 'post_add', field: 'crea nueva lista', route: 'newList' },
    { icon: 'fingerprint', field: 'Inicio de sesión', route: 'login' },
    { icon: 'how_to_reg', field: 'Registro', route: 'register' }];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

}
