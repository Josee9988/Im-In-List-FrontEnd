import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})

export class BackofficeComponent {
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




  constructor() {
    this.premiumEnero = 154;
    this.premiumAbril = 1;
    this.premiumMayo = 1;
  }

  // Clases donde se almacenerán los valores
  public doughnutChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // Valores obtenidos de la base de datos para usuarios registrados
  public doughnutChartRegisterUsers: MultiDataSet = [
    [this.registradosEnero, this.registradosFebrero, this.registradosMarzo, this.registradosAbril,
    this.registradosMayo, this.registradosJunio, this.registradosJulio, this.registradosAgosto,
    this.registradosSeptiembre, this.registradosOctubre, this.registradosNoviembre, this.registradosDiciembre],
  ];
  // Valores obtenidos de la base de datos para usuarios premium
  public doughnutChartPremiumUsers: MultiDataSet = [
    [this.premiumEnero, this.premiumFebrero, this.premiumMarzo, this.premiumAbril,
    this.premiumMayo, this.premiumJunio, this.premiumJulio, this.premiumAgosto,
    this.premiumSeptiembre, this.premiumOctubre, this.premiumNoviembre, this.premiumDiciembre],
  ];

  // Valores obtenidos de la base de datos para listas creadas
  public doughnutChartCreatedLists: MultiDataSet = [
    [this.listasEnero, this.listasFebrero, this.listasMarzo, this.listasAbril,
    this.listasMayo, this.listasJunio, this.listasJulio, this.listasAgosto,
    this.listasSeptiembre, this.listasOctubre, this.listasNoviembre, this.listasDiciembre],
  ];

  public doughnutChartType: ChartType = 'doughnut';


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
