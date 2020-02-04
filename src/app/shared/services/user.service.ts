import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/Users.model';

import usersUrl from './../../../assets/config.json';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly USER_URL: string = usersUrl.usersUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.USER_URL)
      .pipe(tap(), catchError(this.handleError<User[]>('getUsers', [])));
  }


  getUser(id: number): Observable<User> {
    const url = `${this.USER_URL}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(map(user => user[0]), // returns a {0|1} element array
        tap(), catchError(this.handleError<User>(`getUser id=${id}`)));
  }


  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.USER_URL, user, this.httpOptions).pipe(
      tap(), catchError(this.handleError<User>('postUser')));
  }


  putUser(user: User): Observable<any> {
    return this.http.put(this.USER_URL, user, this.httpOptions).pipe(
      tap(), catchError(this.handleError<any>('updatedUser')));
  }


  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.USER_URL}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(), catchError(this.handleError<User>('deletedUser')));
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
