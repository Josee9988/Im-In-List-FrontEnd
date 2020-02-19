import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
  private readonly LISTAS_URL: string = environment.apiUrl + 'listas';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('Lista service');
  }

  /**
   * Summary: gets all the listas from the API for Admin porpouses.
   */
  getListas(): Observable<ILista[]> {
    return this.http.get<ILista[]>(this.LISTAS_URL + 'Admin')
      .pipe(tap(), catchError(this.handleError<ILista[]>('getListas', [])));
  }

  /**
   * Summary: gets all the listas of the user from the API
   */
  getListasUser(): Observable<ILista[]> {
    return this.http.get<ILista[]>(this.LISTAS_URL)
      .pipe(tap(), catchError(this.handleError<ILista[]>('getListas', [])));
  }

  /**
   * Summary: retreives one lista by an ID.
   * @param url id of the lista.
   */
  getLista(url: string): Observable<any> {
    const getUrl = `${this.LISTAS_URL}/${url}`;
    return this.http.get<any>(getUrl)
      .pipe(tap(), catchError(this.handleError<ILista>(`getLista url=${url}`)));
  }

  /**
   * Summary: In case that the list is protected, will send the password that user inputed for checking if is true
   * @param url is the string of the url with password
   */
  getListaPassword(url: string): Observable<any> {
    alert('La url recibida es:' + url);
    const getUrl = `${this.LISTAS_URL}/${url}`;
    return this.http.get<any>(getUrl)
      .pipe(tap(), catchError(this.handleError<ILista>(`getLista url=${url}`)));
  }

  /**
   * Summary: creates an lista, for registered users.
   * @param lista the lista that will be created.
   */
  postListaRegistered(lista: ILista): Observable<any> {
    return this.http.post<ILista>(this.LISTAS_URL, lista, this.httpOptions).pipe(
      tap(), catchError(this.handleError<ILista>('postLista')));
  }

  /**
   * Summary: modifys an existing lista., for registered users.
   * @param lista the lista that will be modified.
   */
  putListaRegistered(lista: ILista): Observable<any> {
    return this.http.put(`${this.LISTAS_URL}/${lista.url}`, lista, this.httpOptions).pipe(
      tap(), catchError(this.handleError<any>('putLista')));
  }

  /**
   * Summay: removes an lista from the database for normal users.
   * @param URLlist is the URL of the list that want to be deleted
   */
  deleteLista(URLlist: string): Observable<any> {
    const url = environment.apiUrl + 'listas/' + URLlist;

    return this.http.delete<ILista>(url, this.httpOptions).pipe(
      tap(), catchError(this.handleError<ILista>('deleteLista')));
  }

  /**
   * Summay: removes an lista from the database if user is rol 0 (Admin).
   * @param URLlist is the URL of the list that want to be deleted
   */
  deleteListaAdmin(URLlist: string): Observable<any> {
    const url = environment.apiUrl + 'listasAdmin/' + URLlist;

    return this.http.delete<ILista>(url, this.httpOptions).pipe(
      tap(), catchError(this.handleError<ILista>('deleteListaAdmin')));
  }
}
