import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-lists-able',
  templateUrl: './lists-table.component.html',
  styleUrls: ['./lists-table.component.scss'],

})
export class ListsTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'idCreador', 'titulo', 'descripcion', 'elemento', 'acciones'];
  dataSource = new MatTableDataSource<IPeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface IPeriodicElement {
  id: number;
  idCreador: number;
  titulo: string;
  descripcion: string;
  elemento: number;
  acciones: string;
}

const ELEMENT_DATA: IPeriodicElement[] = [
  {
    id: 1, idCreador: 2, titulo: 'Hydrogen', descripcion: 'Cena sabado',
    elemento: 1, acciones: '<mat-icon > delete </mat-icon>',
  },
  {
    id: 2, idCreador: 1, titulo: 'Hydrogen', descripcion: 'Evento fiesta',
    elemento: 2, acciones: '<mat-icon > delete </mat-icon>',
  }, {
    id: 3, idCreador: 4, titulo: 'Hydrogen', descripcion: 'Martin Garrix',
    elemento: 0, acciones: '<mat-icon > delete </mat-icon>',
  }, {
    id: 4, idCreador: 2, titulo: 'Hydrogen', descripcion: 'Jorgito El Guayaco',
    elemento: 0, acciones: '<mat-icon > delete </mat-icon>',
  }, {
    id: 5, idCreador: 5, titulo: 'Hydrogen', descripcion: 'carlosAlfredo@getMaxListeners.com',
    elemento: 0, acciones: '<mat-icon > delete </mat-icon>',
  }, {
    id: 6, idCreador: 9, titulo: 'Hydrogen', descripcion: 'carlosAlfredo@getMaxListeners.com',
    elemento: 0, acciones: '<mat-icon > delete </mat-icon>',
  }, {
    id: 7, idCreador: 1, titulo: 'Hydrogen', descripcion: 'carlosAlfredo@getMaxListeners.com',
    elemento: 4, acciones: '<mat-icon > delete </mat-icon>',
  }, {
    id: 8, idCreador: 4, titulo: 'Hydrogen', descripcion: 'carlosAlfredo@getMaxListeners.com',
    elemento: 0, acciones: '<mat-icon > delete </mat-icon>',
  }, {
    id: 9, idCreador: 7, titulo: 'Hydrogen', descripcion: 'carlosAlfredo@getMaxListeners.com',
    elemento: 0, acciones: '<mat-icon > delete </mat-icon>',
  },
];
