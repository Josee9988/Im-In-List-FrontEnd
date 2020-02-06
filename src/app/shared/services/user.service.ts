import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IUser } from '../models/IUsers.model';

import usersUrl from './../../../assets/config.json';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly USER_URL: string = usersUrl.usersUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.USER_URL)
      .pipe(tap(), catchError(this.handleError<IUser[]>('getUsers', [])));
  }


  getUser(id: number): Observable<IUser> {
    const url = `${this.USER_URL}/?id=${id}`;
    return this.http.get<IUser[]>(url)
      .pipe(map(user => user[0]), // returns a {0|1} element array
        tap(), catchError(this.handleError<IUser>(`getUser id=${id}`)));
  }


  postUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.USER_URL, user, this.httpOptions).pipe(
      tap(), catchError(this.handleError<IUser>('postUser')));
  }


  putUser(user: IUser): Observable<any> {
    return this.http.put(this.USER_URL, user, this.httpOptions).pipe(
      tap(), catchError(this.handleError<any>('updatedUser')));
  }


  deleteUser(user: IUser | number): Observable<IUser> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.USER_URL}/${id}`;

    return this.http.delete<IUser>(url, this.httpOptions).pipe(
      tap(), catchError(this.handleError<IUser>('deletedUser')));
  }
}
