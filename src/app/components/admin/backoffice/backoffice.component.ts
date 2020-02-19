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
  usuariosRegistrados: Array<number>;
  usuariosPremium: Array<number>;
  listasCreated: Array<number>;


  private observableGetlista: any;
  private observableGetUser: any;


  doughnutChartLabels: string[];
  doughnutChartRegisterUsers: Array<any>;
  doughnutChartPremiumUsers: Array<any>;
  doughnutChartCreatedLists: Array<any>;

  // Tipo de grafico que se mostrará
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private listaService: ListaService, private userService: UserService) {
    for (let index = 1; index < 13; index++) {
      this.usuariosRegistrados[index] = 0;
      this.usuariosPremium[index] = 0;
      this.listasCreated[index] = 0;
    }

    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.observableGetlista = this.listaService.getListas().subscribe(Response => this.fillDataListas(Response));

    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.observableGetUser = this.userService.getUsers().subscribe(Response => this.fillDataUsers(Response));

  }

  /**
   * Sumary: Get the data passed by param and assign it to the consts in case of the users be 1 or 2 for use the carts
   * @param Response Is the response from the API (database)
   */
  fillDataUsers(Response: any): void {
    for (let index = 0; index < Response.length; index++) {
      if (Response[index].user.role === 1) {
        for (let mes = 1; index < 13; index++) {
          if (Response[index].user.created_at.includes(this.currentYear.toString() + '-0' + mes)) {

          }
        }
      } else if (Response[index].user.role === 2) {

      }

    }
    for (const user of Response) {
      if (user.role === 1) {

)
        debugger;
        if (user.created_at.includes(this.currentYear.toString() + '01')) {
          this.registradosEnero++;
        } else if (user.created_at.includes('' + this.currentYear.toString() + '02')) {
          this.registradosFebrero++;
        } else if (user.created_at.includes(this.currentYear.toString() + '03')) {
          this.registradosMarzo++;
        } else if (user.created_at.includes(this.currentYear.toString() + '04')) {
          this.registradosAbril++;
        } else if (user.created_at.includes(this.currentYear.toString() + '05')) {
          this.registradosMayo++;
        } else if (user.created_at.includes(this.currentYear.toString() + '01')) {
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
      } else if (user.role === 2) {
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

  /**
   * Sumary: Get the data passed by param and assign it to the consts for show when the lists have beencreated
   * @param Response Is the response from the API (database)
   */
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
  }

  ngOnDestroy() {
    if (this.observableGetlista) {
      this.observableGetlista.unsubscribe();
    }
    if (this.observableGetUser) {
      this.observableGetUser.unsubscribe();
    }
  }
}
