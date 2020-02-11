import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ListaService } from './../../../shared/services/lista.service';
import { UserService } from './../../../shared/services/user.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})

export class BackofficeComponent implements OnInit {
  registradosEnero: number;
  registradosFebrero: number;
  registradosMarzo: number;
  registradosAbril: number;
  registradosMayo: number;
  registradosJunio: number;
  registradosJulio: number;
  registradosAgosto: number;
  registradosSeptiembre: number;
  registradosOctubre: number;
  registradosNoviembre: number;
  registradosDiciembre: number;
  premiumEnero: number;
  premiumFebrero: number;
  premiumMarzo: number;
  premiumAbril: number;
  premiumMayo: number;
  premiumJunio: number;
  premiumJulio: number;
  premiumAgosto: number;
  premiumSeptiembre: number;
  premiumOctubre: number;
  premiumNoviembre: number;
  premiumDiciembre: number;
  listasEnero: number;
  listasFebrero: number;
  listasMarzo: number;
  listasAbril: number;
  listasMayo: number;
  listasJunio: number;
  listasJulio: number;
  listasAgosto: number;
  listasSeptiembre: number;
  listasOctubre: number;
  listasNoviembre: number;
  listasDiciembre: number;

  doughnutChartLabels: string[];
  doughnutChartRegisterUsers: Array<any>;
  doughnutChartPremiumUsers: Array<any>;
  doughnutChartCreatedLists: Array<any>;

  // Tipo de grafico que se mostrará
  public doughnutChartType: ChartType = 'doughnut';




  constructor(private listaService: ListaService, private userService: UserService) {
    this.registradosEnero = 15;
    this.registradosAgosto = 2;
    this.registradosSeptiembre = 12;
    this.premiumEnero = 154;
    this.premiumFebrero = 13;
    this.premiumOctubre = 54;
    this.listasMayo = 1;
    this.listasOctubre = 2;
    this.listasDiciembre = 1;
  }


  ngOnInit() {

    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.listaService.getListas().subscribe(Response => this.fillDataListas(Response));

    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.userService.getUsers().subscribe(Response => this.fillDataUsers(Response));

  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  fillDataUsers(Response: any) {
    // Valores obtenidos de la base de datos para usuarios registrados
    this.doughnutChartRegisterUsers = [
      [this.registradosEnero, this.registradosFebrero, this.registradosMarzo, this.registradosAbril,
      this.registradosMayo, this.registradosJunio, this.registradosJulio, this.registradosAgosto,
      this.registradosSeptiembre, this.registradosOctubre, this.registradosNoviembre, this.registradosDiciembre],
    ];

    // Valores obtenidos de la base de datos para usuarios premium
    this.doughnutChartPremiumUsers = [
      [this.premiumEnero, this.premiumFebrero, this.premiumMarzo, this.premiumAbril,
      this.premiumMayo, this.premiumJunio, this.premiumJulio, this.premiumAgosto,
      this.premiumSeptiembre, this.premiumOctubre, this.premiumNoviembre, this.premiumDiciembre],
    ];


    // Clases donde se almacenerán los valores
    this.doughnutChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  }

  fillDataListas(Response: any) {
    console.log(Response);

    for (const lista of Response) {
      if (lista.created_at.includes('2020-01')) {
        this.listasEnero++;
      } else if (lista.created_at.includes('2020-02')) {
        this.listasFebrero++;
      } else if (lista.created_at.includes('2020-03')) {
        this.listasMarzo++;
      } else if (lista.created_at.includes('2020-04')) {
        this.listasAbril++;
      } else if (lista.created_at.includes('2020-05')) {
        this.listasMayo++;
      } else if (lista.created_at.includes('2020-06')) {
        this.listasJunio++;
      } else if (lista.created_at.includes('2020-07')) {
        this.listasJulio++;
      } else if (lista.created_at.includes('2020-08')) {
        this.listasAgosto++;
      } else if (lista.created_at.includes('2020-09')) {
        this.listasSeptiembre++;
      } else if (lista.created_at.includes('2020-10')) {
        this.listasOctubre++;
      } else if (lista.created_at.includes('2020-11')) {
        this.listasNoviembre++;
      } else if (lista.created_at.includes('2020-12')) {
        this.listasDiciembre++;
      }

    }

    // Clases donde se almacenerán los valores
    this.doughnutChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


    // Valores obtenidos de la base de datos para listas creadas
    this.doughnutChartCreatedLists = [
      [this.listasEnero, this.listasFebrero, this.listasMarzo, this.listasAbril,
      this.listasMayo, this.listasJunio, this.listasJulio, this.listasAgosto,
      this.listasSeptiembre, this.listasOctubre, this.listasNoviembre, this.listasDiciembre],
    ];
  }

}
