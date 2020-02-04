import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './../models/Users.model';
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';

import usersUrl from './../../assets/config.json';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly USER_URL = usersUrl.usersUrl;
  private handleError: HandleError;

  constructor(private http: HttpClient/*, httpErrorHandler: HttpErrorHandler,
    // tslint:disable-next-line: align
    handleError = httpErrorHandler.createHandleError('HeroesService')*/) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.USER_URL)
      .pipe(tap( // Log the result or error
        data => console.log(data),
        error => console.log(error)
      ));
  }

  /*getUser(id: number): Observable<User> {
    //return of(this.userMock.find(user => user.id === id));
  }*/

  modifyUser() {

  }

  deleteUser() {

  }
}
