import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserService } from './../../../shared/services/user.service';
import { SnackbarDisplayerService } from 'src/app/shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from 'src/app/shared/enums/snackbar-error-type.enum';
import { IUser } from 'src/app/shared/models/IUsers.interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],

})
/**
 * @author Borja Pérez Mullor <multibalcoy@gmail.com>
 */
export class UsersTableComponent implements OnInit, OnDestroy {
  items: Array<IUser>;
  displayedColumns: string[] = ['id', 'nombre', 'email', 'rol', 'acciones'];
  dataSource = new MatTableDataSource();

  private observableFill: any;
  private observableDelete: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private userService: UserService,
    private errorSnackbarDisplayerService: SnackbarDisplayerService,
    private location: Location) {
  }

  ngOnInit() {
    this.fillDataUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Sumary: This function receive a string and filter the results which one contains that string
   * @param filterValue Is what user introduceson the input and filter the data
   */
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Sumary: This function is used to fill data inside dataSource for show it on table
   */
  fillDataUsers(): void {
    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.observableFill = this.userService.getUsers().subscribe(Response => { this.items = Response; this.dataSource.data = this.items; });

  }

  /**
   * Sumary: This function is called from button on HTML, which one will delete an user from database
   * @param nombre Param received from HTML and used to show a confirm alert to user
   * @param id Param received from HTML and used to indicade the server which user want to be delete
   */
  onDelete(nombre: string, id: number): void {
    if (confirm('¿Estás seguro que desea eliminar el usuario ' + nombre + '?')) {
      this.observableDelete = this.userService.deleteUser(id).subscribe(Response => {
        if (Response.message === 'usuario eliminada correctamente') {
          this.errorSnackbarDisplayerService.
            openSnackBar(Response.message, SnackBarErrorType.success);
          this.dataSource.data = this.items.filter(user => user.id !== id);
        }
      }
      );
    }
  }

  /**
   * Sumary: When admin click edit button, it will redirect to editProfile with the ID of the user wanted
   * @param id is the ID of the user that want to be edited
   */
  onEdit(id: number): void {
    this.router.navigate(['/editProfile/' + id]);
  }

  /**
   * Redirects to the last URL used.
   */
  onGoBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.observableFill) {
      this.observableFill.unsubscribe();
    }
    if (this.observableDelete) {
      this.observableDelete.unsubscribe();
    }
  }
}
