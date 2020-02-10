import { Component, OnInit, Injectable } from '@angular/core';
import { ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { AuthService } from './../../shared/services/auth.service';
import { IUser } from '../../shared/models/IUsers.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

@Injectable()
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
  token: any;


  // Tipo de grafico que se mostrará
  public doughnutChartType: ChartType = 'doughnut';

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private UserService: UserService, private AuthService: AuthService, private router: ActivatedRoute) { // injected
    this.profilePicture = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  }


  ngOnInit() {
    // Recibimos el ID
    const id: number = Number(this.router.snapshot.paramMap.get('id'));

    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.UserService.getUser(id).subscribe(Response => this.fillData(Response));

  }
  // Función para añadir los datos del resopnse a la variable
  fillData(Response: any) {
    this.nickname = Response.name;
    this.email = Response.email;

    // Parseamos las respuestas para así obtener la respuesta como Array
    this.listasCreadas = JSON.parse(Response.listasCreadas).length;
    this.listasParticipadas = JSON.parse(Response.listasParticipantes).length;

    // Clases donde se almacenerán los valores
    this.doughnutChartLabels = ['Listas creadas', 'Listas participante'];

    // Valores obtenidos de la base de datos para usuarios premium
    this.doughnutChartDataLists = [
      [this.listasCreadas, this.listasParticipadas],
    ];

  }


}
