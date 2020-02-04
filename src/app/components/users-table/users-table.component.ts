import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';


/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],

})
export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'email', 'rol', 'listasCreadas', 'listasParticipante', 'acciones'];
  dataSource = new MatTableDataSource<IPeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface IPeriodicElement {
  nombre: string;
  id: number;
  email: string;
  rol: string;
  listasCreadas: Array<number>;
  listasParticipante: Array<number>;
  acciones: string;
}

const ELEMENT_DATA: IPeriodicElement[] = [
  {
    id: 1, nombre: 'Hydrogen', email: 'carlosAlfredo@getMaxListeners.com', rol: '0',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>',
  },
  {
    id: 2, nombre: 'Helium', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 3, nombre: 'Lithium', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 4, nombre: 'Beryllium', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 5, nombre: 'Boron', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 6, nombre: 'Carbon', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 7, nombre: 'Nitrogen', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 8, nombre: 'Oxygen', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 9, nombre: 'Fluorine', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 10, nombre: 'Neon', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 11, nombre: 'Sodium', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 12, nombre: 'Magnesium', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 13, nombre: 'Aluminum', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 14, nombre: 'Silicon', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 15, nombre: 'Phosphorus', email: 'carlosAlfredo@getMaxListeners.com', rol: '0',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 16, nombre: 'Sulfur', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 17, nombre: 'Chlorine', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 18, nombre: 'Argon', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 19, nombre: 'Potassium', email: 'carlosAlfredo@getMaxListeners.com', rol: '2',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
  {
    id: 20, nombre: 'Calcium', email: 'carlosAlfredo@getMaxListeners.com', rol: '1',
    listasCreadas: [1, 2, 3], listasParticipante: [1, 2, 3], acciones: '<mat-icon > delete </mat-icon>'
  },
];
