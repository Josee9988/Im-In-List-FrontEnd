import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IUser } from '../models/IUsers.interface';

import { environment } from './../../../environments/environment';
import { IRegisterUser, ILoginUser } from '../models/ILogin-user.interface';

@Injectable({
  providedIn: 'root'
})

/**
 * HTTP calls to the API.
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class UserService {
  private readonly USER_URL: string = environment.apiUrl + 'users';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  /**
   * Summary: gets all the users from the API.
   */
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.USER_URL)
      .pipe(tap(), catchError(this.handleError<IUser[]>('getUsers', [])));
  }


  /**
   * Summary: retreives one user by an ID.
   * @param id id of the user.
   */
  getUser(id: number): any {
    return this.http.get<IUser[]>(environment.apiUrl + 'users/' + id)
      .pipe(tap(), catchError(this.handleError<IUser[]>('getUser', [])));
  }



  /**
   * Summary: creates an user
   * @param user the user that will be created.
   */
  postUser(user: IRegisterUser): Observable<any> {
    return this.http.post<IUser>(environment.apiUrl + 'register', user, this.httpOptions).pipe(
      tap(), catchError(this.handleError<IUser>('postUser')));
  }

  /**
   * Summary: postLogin Inicia la sesión de un usuario a partir de sus credenciales, devuelve
   * un observable con un token si la respuesta es satisfactoria.
   *
   * @param loginUser Credenciales del usuario para efectuar el inicio de sesión.
   */
  postLogin(loginUser: ILoginUser): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'login', loginUser, this.httpOptions).pipe(
      tap(), catchError(this.handleError<any>('postLogin')));
  }


  /**
   * Summary: modifys an existing user.
   * @param user the user that will be modified.
   */
  putUser(user: IUser): Observable<any> {
    return this.http.put(this.USER_URL, user, this.httpOptions).pipe(
      tap(), catchError(this.handleError<any>('updatedUser')));
  }


  /**
   * Summay: removes an user from the database.
   * @param user| number receives an user object, or an id, and removes that object from the database.
   */
  deleteUser(user: IUser | number): Observable<any> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.USER_URL}/${id}`;

    return this.http.delete<IUser>(url, this.httpOptions).pipe(
      tap(), catchError(this.handleError<IUser>('deletedUser')));
  }

  /**
   * Sumary: Server answer with all the information about the user logged
   */
  getDataUser(): Observable<any> {
    return this.http.get<IUser[]>(environment.apiUrl + 'user')
      .pipe(tap(), catchError(this.handleError<IUser[]>('getDataUser', [])));
  }

  /**
   * Sumary: This function look for the user ID and then ask for the lists that have created that user
   */
  getCreadas(): any {
    this.getDataUser().subscribe(Response => {
      return this.http.get<IUser[]>(environment.apiUrl + 'listasCreadas' + Response.user.id)
        .pipe(tap(), catchError(this.handleError<IUser[]>('getDataUser', [])));
    });
  }

  /**
   * Sumary: This function look for the user ID and then ask for the lists that have created that user
   */
  getParticipadas(): any {
    this.getDataUser().subscribe(Response => {
      return this.http.get<IUser[]>(environment.apiUrl + 'listasParticipadas' + Response.user.id)
        .pipe(tap(), catchError(this.handleError<IUser[]>('getDataUser', [])));
    });
  }
}
