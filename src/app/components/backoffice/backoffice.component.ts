import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})

export class BackofficeComponent {
  nickname: string;
  email: string;
  profilePicture: string;

  constructor() {

  }

  //Clases donde se almacenerán los valores
  public doughnutChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  //Valores obtenidos de la base de datos
  public doughnutChartData: MultiDataSet = [
    [350, 403, 200, 10, 40, 512],

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
