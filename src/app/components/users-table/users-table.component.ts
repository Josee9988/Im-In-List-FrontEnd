import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],

})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'rol', 'listasCreadas', 'listasParticipante'];
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
  listasCreadas: Array<number>;
  listasParticipante: Array<number>;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1, nombre: 'Hydrogen', email: 'carlosAlfredo@getMaxListeners.com', rol: '0',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 2, nombre: 'Helium', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 3, nombre: 'Lithium', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 4, nombre: 'Beryllium', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 5, nombre: 'Boron', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 6, nombre: 'Carbon', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 7, nombre: 'Nitrogen', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 8, nombre: 'Oxygen', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 9, nombre: 'Fluorine', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 10, nombre: 'Neon', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 11, nombre: 'Sodium', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 12, nombre: 'Magnesium', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 13, nombre: 'Aluminum', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 14, nombre: 'Silicon', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 15, nombre: 'Phosphorus', email: 'carlosAlfredo@getMaxListeners.com', rol: '0',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 16, nombre: 'Sulfur', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 17, nombre: 'Chlorine', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 18, nombre: 'Argon', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 19, nombre: 'Potassium', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
  {
    id: 20, nombre: 'Calcium', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3]
  },
];
