import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ListaService } from './../../../shared/services/lista.service';

@Component({
  selector: 'app-lists-able',
  templateUrl: './lists-table.component.html',
  styleUrls: ['./lists-table.component.scss'],

})
export class ListsTableComponent implements OnInit {

  items: any;
  displayedColumns: string[] = ['id', 'idCreador', 'titulo', 'descripcion', 'elemento', 'acciones'];
  dataSource = new MatTableDataSource<Element>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private listaService: ListaService) {

  }


  ngOnInit() {
    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.listaService.getListas().subscribe(Response => this.fillDataLists(Response));

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  fillDataLists(Response: any) {
    this.items = Response;
    this.dataSource.data = this.items;

  }
}
/*
export interface IlistaDetails {
  id: number;
  idCreador: number;
  titulo: string;
  descripcion: string;
  elemento: number;
  acciones: string;
}

const dataLista: IlistaDetails[] = [];
*/
