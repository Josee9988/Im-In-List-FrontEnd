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

    for (const user of Response) {
      if (user.role === '1') {
        if (user.created_at.includes('2020-01')) {
          this.registradosEnero++;
        } else if (user.created_at.includes('2020-02')) {
          this.registradosFebrero++;
        } else if (user.created_at.includes('2020-03')) {
          this.registradosMarzo++;
        } else if (user.created_at.includes('2020-04')) {
          this.registradosAbril++;
        } else if (user.created_at.includes('2020-05')) {
          this.registradosMayo++;
        } else if (user.created_at.includes('2020-06')) {
          this.registradosJunio++;
        } else if (user.created_at.includes('2020-07')) {
          this.registradosJulio++;
        } else if (user.created_at.includes('2020-08')) {
          this.registradosAgosto++;
        } else if (user.created_at.includes('2020-09')) {
          this.registradosSeptiembre++;
        } else if (user.created_at.includes('2020-10')) {
          this.registradosOctubre++;
        } else if (user.created_at.includes('2020-11')) {
          this.registradosNoviembre++;
        } else if (user.created_at.includes('2020-12')) {
          this.registradosDiciembre++;
        }
      } else if (user.role === '2') {
        if (user.created_at.includes('2020-01')) {
          this.premiumEnero++;
        } else if (user.created_at.includes('2020-02')) {
          this.premiumFebrero++;
        } else if (user.created_at.includes('2020-03')) {
          this.premiumMarzo++;
        } else if (user.created_at.includes('2020-04')) {
          this.premiumAbril++;
        } else if (user.created_at.includes('2020-05')) {
          this.premiumMayo++;
        } else if (user.created_at.includes('2020-06')) {
          this.premiumJunio++;
        } else if (user.created_at.includes('2020-07')) {
          this.premiumJulio++;
        } else if (user.created_at.includes('2020-08')) {
          this.premiumAgosto++;
        } else if (user.created_at.includes('2020-09')) {
          this.premiumSeptiembre++;
        } else if (user.created_at.includes('2020-10')) {
          this.premiumOctubre++;
        } else if (user.created_at.includes('2020-11')) {
          this.premiumNoviembre++;
        } else if (user.created_at.includes('2020-12')) {
          this.premiumDiciembre++;
        }
      }
    }
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
