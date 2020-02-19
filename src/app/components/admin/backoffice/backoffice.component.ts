import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartType } from 'chart.js';
import { ListaService } from './../../../shared/services/lista.service';
import { UserService } from './../../../shared/services/user.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})

/**
 * @author Borja Pérez Mullor <multibalcoy@gmail.com>
 */

export class BackofficeComponent implements OnInit, OnDestroy {
  currentYear: number;
  usuariosRegistrados: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  usuariosPremium: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  listasCreated: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


  private observableGetlista: any;
  private observableGetUser: any;


  doughnutChartLabels: string[];
  doughnutChartRegisterUsers: Array<any>;
  doughnutChartPremiumUsers: Array<any>;
  doughnutChartCreatedLists: Array<any>;

  // Tipo de grafico que se mostrará
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private listaService: ListaService, private userService: UserService) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    // Llamamos a la funcion que asignará todos los valores a sus variables
    //  this.observableGetlista = this.listaService.getListas().subscribe(Response => this.fillDataListas(Response));

    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.observableGetUser = this.userService.getUsers().subscribe(Response => this.fillDataUsers(Response));

  }

  /**
   * Sumary: Get the data passed by param and assign it to the consts in case of the users be 1 or 2 for use the carts
   * @param Response Is the response from the API (database)
   */
  fillDataUsers(Response: any): void {
    for (let index = 0; index < Response.length; index++) {
      if (Response[index].role === 1) {
        for (let mes = 1; mes < 13; mes++) {
          if (mes < 10) {
            console.log('Entro a la función');

            if (Response[index].created_at.includes(this.currentYear.toString() + '-0' + mes)) {
              this.usuariosRegistrados[index]++;

            }
          } else {
            if (Response[index].created_at.includes(this.currentYear.toString() + '-' + mes)) {
              this.usuariosRegistrados[index]++;
            }
          }
        }
      } else if (Response[index].role === 2) {
        for (let mes = 1; mes < 13; mes++) {
          if (mes < 10) {
            if (Response[index].created_at.includes(this.currentYear.toString() + '-0' + mes)) {
              this.usuariosPremium[index]++;
            }
          } else {
            if (Response[index].created_at.includes(this.currentYear.toString() + '-' + mes)) {
              this.usuariosPremium[index]++;
            }
          }
        }
      }

    }
    // Valores obtenidos de la base de datos para usuarios registrados
    this.doughnutChartRegisterUsers =
      [this.usuariosRegistrados[1], this.usuariosRegistrados[2], this.usuariosRegistrados[3],
      this.usuariosRegistrados[4], this.usuariosRegistrados[5], this.usuariosRegistrados[6],
      this.usuariosRegistrados[7], this.usuariosRegistrados[8], this.usuariosRegistrados[9],
      this.usuariosRegistrados[10], this.usuariosRegistrados[11], this.usuariosRegistrados[12]];

    // Valores obtenidos de la base de datos para usuarios premium
    this.doughnutChartPremiumUsers =
      [this.usuariosPremium[1], this.usuariosPremium[2], this.usuariosPremium[3],
      this.usuariosPremium[4], this.usuariosPremium[5], this.usuariosPremium[6],
      this.usuariosPremium[7], this.usuariosPremium[8], this.usuariosPremium[9],
      this.usuariosPremium[10], this.usuariosPremium[11], this.usuariosPremium[12]];

    // Clases donde se almacenerán los valores
    this.doughnutChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  }

  /**
   * Sumary: Get the data passed by param and assign it to the consts for show when the lists have beencreated
   * @param Response Is the response from the API (database)
   */
  /*
  fillDataListas(Response: any): void {
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
  }*/

  ngOnDestroy() {
    if (this.observableGetlista) {
      this.observableGetlista.unsubscribe();
    }
    if (this.observableGetUser) {
      this.observableGetUser.unsubscribe();
    }
  }
}
