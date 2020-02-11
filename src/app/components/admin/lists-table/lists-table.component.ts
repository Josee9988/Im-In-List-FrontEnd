import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ListaService } from './../../../shared/services/lista.service';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';
import { ILista } from 'src/app/shared/models/IListas.model';

@Component({
  selector: 'app-lists-able',
  templateUrl: './lists-table.component.html',
  styleUrls: ['./lists-table.component.scss'],

})
/**
 * @author Borja Pérez Mullor <multibalcoy@gmail.com>
 */
export class ListsTableComponent implements OnInit {

  items: Array<ILista>;
  displayedColumns: string[] = ['id', 'idCreador', 'titulo', 'descripcion', 'elemento', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private listaService: ListaService, private errorSnackbarDisplayerService: SnackbarDisplayerService) {

  }


  ngOnInit() {
    // Get data from database
    this.fillDataLists();


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
   * Sumary: This function is used to fill data inside dataSource for show it on table
   */
  fillDataLists() {
    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.listaService.getListas().subscribe(Response => { this.items = Response; this.dataSource.data = this.items; });

  }

  /**
   * Sumary: This function is called from button on HTML, which one will delete an user from database
   * @param nombre Param received from HTML and used to show a confirm alert to user
   * @param id Param received from HTML and used to indicade the server which user want to be delete
   */
  OnDelete(titulo: string, id: number) {
    if (confirm('¿Estás seguro que desea eliminar la lista ' + titulo + '?')) {
      this.listaService.deleteLista(id).subscribe(Response => {
        if (!Response.ok === undefined) {
          this.errorSnackbarDisplayerService.
            openSnackBar(Response.message, SnackBarErrorType.success);
          this.dataSource.data = this.items.filter(user => user.id !== id);
        }
      }
      );
    }
  }

}
