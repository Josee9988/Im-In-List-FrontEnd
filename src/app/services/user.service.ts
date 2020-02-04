import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './../models/Users.model';

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

  constructor(private http: HttpClient/*, httpErrorHandler: HttpErrorHandler,
    // tslint:disable-next-line: align
    handleError = httpErrorHandler.createHandleError('HeroesService')*/) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.USER_URL)
      .pipe(tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
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
