import { Component, OnInit, Injectable } from '@angular/core';
import { ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { ListaService } from './../../shared/services/lista.service';
import { IUser } from '../../shared/models/IUsers.interface';
import { RefreshNavbarCommunication } from 'src/app/shared/services/communications/refresh-navbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

@Injectable()
/**
 * @author Borja Pérez Mullor <multibalcoy@gmail.com>
 */
export class ProfileComponent implements OnInit {
  user: IUser[];
  nickname: string;
  email: string;
  profilePicture: string;
  respuesta: any;

  // Grafica Perfil
  lengthSet: number;
  cantidadListasCreadas: string;
  cantidadListasExistentes: string;
  public canvasWidth = 300;
  public needleValue = '';
  public centralLabel = '';
  public bottomLabel = '';
  public options = {
    hasNeedle: true,
    needleColor: '#673ab7',
    needleUpdateSpeed: 1000,
    arcColors: ['#673ab7', '#6655'],
    arcDelimiters: [],
    rangeLabel: [],
    needleStartValue: 0,
  };
  // Grafica Perfil

  constructor(
    private userService: UserService,
    private listaService: ListaService,
    private router: Router,
    private refreshNavbarCommunication: RefreshNavbarCommunication) {

  }


  ngOnInit() {
    this.fillData();
    this.listaService.getListasUser().subscribe(Response => {
      this.lengthSet = Response.length * 10;
      this.needleValue = this.lengthSet.toString();
      this.bottomLabel = Response.length.toString();
    });
    this.listaService.getListas().subscribe(Response => {
      const sizeBar = (this.lengthSet * 10) / Response.length;
      this.options.arcDelimiters = [sizeBar];
      this.options.rangeLabel = ['0', Response.length.toString()];
    });
  }

  /**
   * Sumary: Get the data passed by param and assign it to the consts in case of the users be 1 or 2 for use the carts
   * @param Response Is the response from the API (database)
   */
  fillData() {
    this.userService.getDataUser().subscribe(Response => {
      this.nickname = Response.user.name;
      this.email = Response.user.email;
    });

  }
  /**
   * Sumary: This function will close session and redirect home
   */
  onClose() {
    this.refreshNavbarCommunication.next(1);
    this.router.navigate(['/home']);
  }
}
