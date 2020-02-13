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

  // Titulo variables y datos guardados
  doughnutChartLabels: string[];
  doughnutChartDataLists: Array<any>;

  user: IUser[];
  nickname: string;
  email: string;
  profilePicture: string;
  respuesta: any;

  // Tipo de grafico que se mostrará
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private userService: UserService,
    private router: Router,
    private refreshNavbarCommunication: RefreshNavbarCommunication) {
    this.profilePicture = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  }


  ngOnInit() {
    this.userService.getDataUser().subscribe(Response => this.fillData(Response));
  }

  /**
   * Sumary: Get the data passed by param and assign it to the consts in case of the users be 1 or 2 for use the carts
   * @param Response Is the response from the API (database)
   */
  fillData(Response: any) {
    this.nickname = Response.user.name;
    this.email = Response.user.email;

    // Parseamos las respuestas para así obtener la respuesta como Array
    if (Response.user.listasCreadas === null) {
      this.listasCreadas = 0;
    } else {
      this.listasCreadas = JSON.parse(Response.user.listasCreadas).length;
    }

    if (Response.user.listasParticipantes === null) {
      this.listasParticipadas = 0;
    } else {
      this.listasParticipadas = JSON.parse(Response.user.listasParticipantes).length;
    }

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
