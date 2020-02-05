import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ILista } from '../models/IListas.model';

import listasurl from './../../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private readonly LISTA_URL: string = listasurl.listasUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
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
