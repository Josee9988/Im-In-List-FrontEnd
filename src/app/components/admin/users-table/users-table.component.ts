import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserService } from './../../../shared/services/user.service';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],

})
/**
 * @author Borja Pérez Mullor <multibalcoy@gmail.com>
 */
export class UsersTableComponent implements OnInit {
  items: any;
  displayedColumns: string[] = ['id', 'nombre', 'email', 'rol', 'listasCreadas', 'listasParticipante', 'acciones'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UserService, private errorSnackbarDisplayerService: SnackbarDisplayerService) {

  }
  ngOnInit() {
    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.userService.getUsers().subscribe(Response => this.fillDataUsers(Response));

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
   * @param Response is the data that has been received from database
   */
  fillDataUsers(Response: any) {
    this.items = Response;

    this.dataSource.data = this.items;

  }

  OnDelete(nombre: string, id: number) {
    if (confirm('¿Estás seguro que desea eliminar el usuario ' + nombre + '?')) {

      this.userService.deleteUser(id).subscribe(Response => this.errorSnackbarDisplayerService.
        openSnackBar(Response.message, SnackBarErrorType.success));
    }
  }
}
