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

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
  dataSource: any = new MatTableDataSource();

  private observableFill: any;
  private observableDelete: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private userService: UserService,
    private errorSnackbarDisplayerService: SnackbarDisplayerService,
    private location: Location,
    public dialog: MatDialog, ) {
  }

  ngOnInit() {
    if (this.router.url === '/admin/adminPremium') {
      this.fillUsersPremium();
    } else if (this.router.url === '/admin/adminRegister') {
      this.fillUsersRegister();
    }


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Summary: This function receive a string and filter the results which one contains that string
   * @param filterValue Is what user introduceson the input and filter the data
   */
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Summary: This function is used to fill data about premium usere inside dataSource for show it on table
   */
  fillUsersPremium(): void {
    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.observableFill = this.userService.getUsers().subscribe(Response => {
      this.items = Response;
      this.dataSource.data = this.items;
      this.items = this.items.filter(user => user.role !== 1);
      this.dataSource.data = this.dataSource.data.filter(user => user.role !== 1);
    });
  }

  /**
   * Summary: This function is used to fill data about Register users inside dataSource for show it on tabla
   */
  fillUsersRegister(): void {
    // Llamamos a la funcion que asignará todos los valores a sus variables
    this.observableFill = this.userService.getUsers().subscribe(Response => {
      this.items = Response;
      this.dataSource.data = this.items;
      this.items = this.items.filter(user => user.role === 1);
      this.dataSource.data = this.dataSource.data.filter(user => user.role === 1);
    });
  }

  /**
   * Summary: This function is called from button on HTML, which one will delete an user from database
   * @param id Param received from HTML and used to indicade the server which user want to be delete
   */
  onDelete(id: number): void {
    this.observableDelete = this.userService.deleteUser(id).subscribe(Response => {
      if (Response.message === 'usuario eliminada correctamente') {
        this.errorSnackbarDisplayerService.
          openSnackBar(Response.message, SnackBarErrorType.success);
        this.dataSource.data = this.items.filter(user => user.id !== id);
      }
    }
    );
  }

  /**
   * Summary: This function will open an Angular Material to confirm the action
   * @param nombre It's the name of the item that want to be deleted
   * @param id is the url of the item that want to be deleted
   */
  openDialog(nombre: string, id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        width: '50%',
        height: '35%',
        data: {
          name: nombre,
        }
      });

    dialogRef.afterClosed().subscribe(Response => {
      if (Response === true) {
        this.onDelete(id);
      }
    });

  }

  /**
   * Summary: When admin click edit button, it will redirect to editProfile with the ID of the user wanted
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
