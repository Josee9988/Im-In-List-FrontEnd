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

/**
 * HTTP calls to the API.
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class ListaService {
  private readonly LISTA_URL: string = environment.apiUrl + 'listas';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('Lista service');
  }

  /**
   * Summary: gets all the listas from the API for Admin porpouses.
   */
  getListas(): Observable<ILista[]> {
    return this.http.get<ILista[]>(this.LISTA_URL + 'Admin')
      .pipe(tap(), catchError(this.handleError<ILista[]>('getListas', [])));
  }

  /**
   * Summary: gets all the listas of the user from the API
   */
  getListasUser(): Observable<ILista[]> {
    return this.http.get<ILista[]>(this.LISTA_URL)
      .pipe(tap(), catchError(this.handleError<ILista[]>('getListas', [])));
  }
  /**
   * Summary: retreives one lista by an ID.
   * @param id id of the lista.
   */
  getLista(id: number): Observable<ILista> {
    const url = `${this.LISTA_URL}/?id=${id}`;
    return this.http.get<ILista[]>(url)
      .pipe(map(lista => lista[0]), // returns a {0|1} element array
        tap(), catchError(this.handleError<ILista>(`getLista id=${id}`)));
  }


  /**
   * Summary: creates an lista
   * @param lista the lista that will be created.
   */
  postLista(lista: ILista): Observable<ILista> {
    return this.http.post<ILista>(this.LISTA_URL, lista, this.httpOptions).pipe(
      tap(), catchError(this.handleError<ILista>('postLista')));
  }


  /**
   * Summary: modifys an existing lista.
   * @param lista the lista that will be modified.
   */
  putLista(lista: ILista): Observable<any> {
    return this.http.put(this.LISTA_URL, lista, this.httpOptions).pipe(
      tap(), catchError(this.handleError<any>('putLista')));
  }


  /**
   * Summay: removes an lista from the database.
   * @param lista| number receives an lista object, or an id, and removes that object from the database.
   */
  deleteLista(lista: ILista | number): Observable<any> {
    const id = typeof lista === 'number' ? lista : lista.id;
    const url = `${this.LISTA_URL}/${id}`;

    return this.http.delete<ILista>(url, this.httpOptions).pipe(
      tap(), catchError(this.handleError<ILista>('deleteLista')));
  }

  /**
   * Summay: removes an lista from the database if user is rol 0 (Admin).
   * @param URLlist is the URL of the list that want to be deleted
   */
  deleteListaAdmin(URLlist: string): Observable<any> {
    alert('Estás en el listaService!');

    const url = environment.apiUrl + 'listasAdmin/' + URLlist;
    alert('La URL es -->' + url);
    console.log('La url es -->' + url);
    return this.http.delete<ILista>(url, this.httpOptions).pipe(
      tap(), catchError(this.handleError<ILista>('deleteLista')));
  }


}
