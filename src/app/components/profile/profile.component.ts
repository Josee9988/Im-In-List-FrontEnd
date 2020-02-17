import { Component, OnInit, Injectable } from '@angular/core';
import { ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
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
  // Variables para el gráfico
  listasCreadas: number;
  listasParticipadas: number;

  user: IUser[];
  nickname: string;
  email: string;
  profilePicture: string;
  respuesta: any;

  // Grafica Perfil
  public canvasWidth = 300;
  public needleValue = 65;
  public centralLabel = '';
  public name = 'Gauge chart';
  public bottomLabel = '65';
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [30],
    rangeLabel: ['0', '100'],
    needleStartValue: 50,
  };
  // Grafica Perfil

  constructor(
    private userService: UserService,
    private router: Router,
    private refreshNavbarCommunication: RefreshNavbarCommunication) {
    this.profilePicture = 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';
  }


  ngOnInit() {
    this.fillData();
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

    this.userService.getCreadas().subscribe(Response => {
      if (Response.listasCreadas !== 0) {
        this.listasCreadas = Response;
      } else {
        this.listasCreadas = 0;
      }
    });

    this.userService.getParticipadas().subscribe(Response => {
      if (Response.listasParticipadas !== 0) {
        this.listasParticipadas = Response;
      } else {
        this.listasParticipadas = 2;
      }
    });

    // Clases donde se almacenerán los valores
    this.doughnutChartLabels = ['Listas creadas', 'Listas participante'];

    // Valores obtenidos de la base de datos para usuarios premium
    this.doughnutChartDataLists = [
      [this.listasCreadas, this.listasParticipadas],
    ];

  }
  /**
   * Sumary: This function will close session and redirect home
   */
  onClose() {
    this.refreshNavbarCommunication.next(1);
    this.router.navigate(['/home']);
  }
}
