import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ListaService } from './../../../shared/services/lista.service';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';
import { ILista } from 'src/app/shared/models/IListas.model';
import { Router } from '@angular/router';
import { UserService } from './../../../shared/services/user.service';

@Component({
  selector: 'app-lists-able',
  templateUrl: './lists-table.component.html',
  styleUrls: ['./lists-table.component.scss'],

})
/**
 * @author Borja Pérez Mullor <multibalcoy@gmail.com>
 */
export class ListsTableComponent implements OnInit, OnDestroy {

  href: string;
  items: Array<ILista>;
  displayedColumns: string[] = ['id', 'idCreador', 'titulo', 'descripcion', 'elemento', 'url', 'participantes', 'acciones'];
  dataSource = new MatTableDataSource();

  private observableFillAdmin: any;
  private observableFillUser: any;
  private observableDelete: any;
  private observableDeleteAdmin: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private listaService: ListaService, private errorSnackbarDisplayerService: SnackbarDisplayerService, private router: Router, private userService: UserService) {

  }


  ngOnInit() {
    if (this.router.url === '/admin/adminLists') {
      // Get data from database
      this.fillDataListsAdmin();
    } else {
      this.fillDataListsUser();
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Sumary: This function receive a string and filter the results which one contains that string
   * @param filterValue Is what user introduceson the input and filter the data
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Sumary: This function is used to fill data of every list for adminsinside dataSource for show it on table
   */
  fillDataListsAdmin() {
    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.observableFillAdmin = this.listaService.getListas().subscribe(Response => { this.items = Response; this.dataSource.data = this.items; });

  }

  /**
   * Sumary: This function is used to fill data of each user inside dataSource for show it on table
   */
  fillDataListsUser() {
    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.observableFillUser = this.listaService.getListasUser().subscribe(Response => { this.items = Response; this.dataSource.data = this.items; });

  }
  /**
   * Sumary: This function is called from button on HTML, which one will delete a list from database
   * @param nombre Param received from HTML and used to show a confirm alert to user
   * @param URLlist Param received from HTML and used to indicade the server which list want to be delete
   */
  onDelete(titulo: string, URLlist: string) {
    if (confirm('¿Estás seguro que desea eliminar la lista ' + titulo + '?')) {

      this.observableDelete = this.userService.getDataUser().subscribe(Response => {
        if (Response.user.role === 0) {
          this.observableDeleteAdmin = this.listaService.deleteListaAdmin(URLlist).subscribe(Respuesta => {
            if (Respuesta.message === 'Lista eliminada correctamente') {
              this.errorSnackbarDisplayerService.
                openSnackBar(Response.message, SnackBarErrorType.success);
              this.dataSource.data = this.items.filter(list => list.url !== URLlist);
            }
          });

        } else {


        }
      });

    }
  }

  onEdit(URLrecibida: string) {
    this.router.navigate(['/editList/' + URLrecibida]);
  }

  ngOnDestroy() {
    if (this.observableFillAdmin) {
      this.observableFillAdmin.unsubscribe();
    }
    if (this.observableFillUser) {
      this.observableFillUser.unsubscribe();
    }
    if (this.observableDelete) {
      this.observableDelete.unsubscribe();
    }
    if (this.observableDeleteAdmin) {
      this.observableDeleteAdmin.unsubscribe();
    }

  }

}
