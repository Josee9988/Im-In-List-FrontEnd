import { Component, OnInit, Injectable } from '@angular/core';
import { ChartType } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { IUser } from '../../shared/models/IUsers.model';

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


  // Tipo de grafico que se mostrará
  public doughnutChartType: ChartType = 'doughnut';

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private UserService: UserService, private router: ActivatedRoute) { // injected
    this.nickname = 'Carlos Alfredo';
    this.email = 'carlos98@gmail.com';
    this.profilePicture = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
    this.listasCreadas = 2;
    this.listasParticipadas = 5;



  }

  getUser(id: number): void {
    // this.UserService.getUsers().subscribe(Response => console.log(Response));
    // this.UserService.getUser(id).subscribe(Response => console.log(Response));
    // this.UserService.postUser(myuser).subscribe(Response => console.log(Response));

  }



  ngOnInit() {
    // this.getUser();

    // Clases donde se almacenerán los valores
    this.doughnutChartLabels = ['Listas creadas', 'Listas participante'];

    // Valores obtenidos de la base de datos para usuarios premium
    this.doughnutChartDataLists = [
      [this.listasCreadas, this.listasParticipadas],
    ];

    // Recibimos el ID
    const id = this.router.snapshot.paramMap.get('id');
    console.log(id);
  }


}
