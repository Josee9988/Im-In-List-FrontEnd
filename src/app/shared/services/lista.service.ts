import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ILista } from '../models/IListas.model';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private readonly LISTA_URL: string = environment.apiUrl + 'api/listas';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('Lista service');
  }

  getListas(): Observable<ILista[]> {
    return this.http.get<ILista[]>(this.LISTA_URL)
      .pipe(tap(), catchError(this.handleError<ILista[]>('getListas', [])));
  }


  getLista(id: number): Observable<ILista> {
    const url = `${this.LISTA_URL}/?id=${id}`;
    return this.http.get<ILista[]>(url)
      .pipe(map(lista => lista[0]), // returns a {0|1} element array
        tap(), catchError(this.handleError<ILista>(`getLista id=${id}`)));
  }


  postLista(lista: ILista): Observable<ILista> {
    return this.http.post<ILista>(this.LISTA_URL, lista, this.httpOptions).pipe(
      tap(), catchError(this.handleError<ILista>('postLista')));
  }


  putLista(lista: ILista): Observable<any> {
    return this.http.put(this.LISTA_URL, lista, this.httpOptions).pipe(
      tap(), catchError(this.handleError<any>('putLista')));
  }


  deleteLista(lista: ILista | number): Observable<ILista> {
    const id = typeof lista === 'number' ? lista : lista.id;
    const url = `${this.LISTA_URL}/${id}`;

    return this.http.delete<ILista>(url, this.httpOptions).pipe(
      tap(), catchError(this.handleError<ILista>('deleteLista')));
  }
}
