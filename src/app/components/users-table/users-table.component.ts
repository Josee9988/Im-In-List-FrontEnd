import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { getMaxListeners } from 'cluster';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],

})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'rol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  nombre: string;
  id: number;
  email: string;
  rol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, nombre: 'Hydrogen', email: 'carlosAlfredo@getMaxListeners.com', rol: 'H' },
  { id: 2, nombre: 'Helium', email: 'carlosAlfredo@getMaxListeners.com', rol: 'He' },
  { id: 3, nombre: 'Lithium', email: 'carlosAlfredo@getMaxListeners.com', rol: 'Li' },
  { id: 4, nombre: 'Beryllium', email: 'carlosAlfredo@getMaxListeners.com', rol: 'Be' },
  { id: 5, nombre: 'Boron', email: 'carlosAlfredo@getMaxListeners.com', rol: 'B' },
  { id: 6, nombre: 'Carbon', email: 'carlosAlfredo@getMaxListeners.com', rol: 'C' },
  { id: 7, nombre: 'Nitrogen', email: 'carlosAlfredo@getMaxListeners.com', rol: 'N' },
  { id: 8, nombre: 'Oxygen', email: 'carlosAlfredo@getMaxListeners.com', rol: 'O' },
  { id: 9, nombre: 'Fluorine', email: 'carlosAlfredo@getMaxListeners.com', rol: 'F' },
  { id: 10, nombre: 'Neon', email: 'carlosAlfredo@getMaxListeners.com', rol: 'Ne' },
  { id: 11, nombre: 'Sodium', email: 'carlosAlfredo@getMaxListeners.com', rol: 'Na' },
  { id: 12, nombre: 'Magnesium', email: 'carlosAlfredo@getMaxListeners.com', rol: 'Mg' },
  { id: 13, nombre: 'Aluminum', email: 'carlosAlfredo@getMaxListeners.com', rol: 'Al' },
  { id: 14, nombre: 'Silicon', email: 'carlosAlfredo@getMaxListeners.com', rol: 'Si' },
  { id: 15, nombre: 'Phosphorus', email: 'carlosAlfredo@getMaxListeners.com', rol: 'P' },
  { id: 16, nombre: 'Sulfur', email: 'carlosAlfredo@getMaxListeners.com', rol: 'S' },
  { id: 17, nombre: 'Chlorine', email: 'carlosAlfredo@getMaxListeners.com', rol: 'Cl' },
  { id: 18, nombre: 'Argon', email: 'carlosAlfredo@getMaxListeners.com', rol: 'Ar' },
  { id: 19, nombre: 'Potassium', email: 'carlosAlfredo@getMaxListeners.com', rol: 'K' },
  { id: 20, nombre: 'Calcium', email: 'carlosAlfredo@getMaxListeners.com', rol: 'Ca' },
];
