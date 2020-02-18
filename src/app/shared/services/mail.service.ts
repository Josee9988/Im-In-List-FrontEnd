import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { environment } from 'src/environments/environment';
import { ISendMail } from '../models/ISendMail.interface';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class MailService {
  private readonly MAIL_URL: string = environment.apiUrl + 'sendMail';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('Mail service');
  }

  /**
   * Summary: sents a mail to the administration of ImInList.
   * @param mail the mail that will be sent.
   */
  sendMail(mail: ISendMail): Observable<any> {
    return this.http.post<ISendMail>(this.MAIL_URL, mail, this.httpOptions).pipe(
      tap(), catchError(this.handleError<ISendMail>('sendMail')));
  }
}
