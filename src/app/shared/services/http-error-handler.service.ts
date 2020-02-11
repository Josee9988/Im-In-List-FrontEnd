import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { SnackbarDisplayerService } from '../../shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from '../enums/snackbar-error-type.enum';
import { AuthService } from './auth.service';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable({
  providedIn: 'root',
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class HttpErrorHandler {
  constructor(private errorSnackbarDisplayerService: SnackbarDisplayerService, private authService: AuthService) { }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName: string = '') => <T>
    (operation: string = 'operation', result: T = {} as T) => this.handleError(serviceName, operation, result)

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(serviceName: string = '', operation: string = 'operation', result: T = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      const message = this.getMessage(error);
      this.checkIfExpiredToken(error, message);
      this.errorSnackbarDisplayerService.openSnackBar(`ERROR: ${serviceName}, ${operation} failed: ${message}`, SnackBarErrorType.error);

      console.error(`HTTP_ERROR_HANDLER ERROR: ${serviceName}: ${operation}:`);
      console.error(error); // show full error to the console

      // Let the app keep running by returning a safe result.
      return of(result);
    };
  }

  /**
   * Summary: receives an error, and gets the main message to be shown  by the SnackbarDisplayerService.
   *
   * @see SnackbarDisplayerService.
   *
   * @param error the error found.
   * @return string with the message of the error.
   */
  getMessage(error: HttpErrorResponse): string {
    if (error.status && error.error.message && error.statusText) {
      return `Error: ${error.statusText} con código ${error.status} devuelve: ${error.error.message}`;
    } else if (error.status && error.error.message) {
      return `Error: con código ${error.status} devuelve: ${error.error.message}`;
    } else if (error.message && error.status) {
      return `Error: con código ${error.status} devuelve: ${error.message}`;
    } else if (error.message) {
      return `Error: ${JSON.stringify(error.message)}`;
    } else {
      return error.toString();
    }
  }

  /**
   * Summary: checks if the error is saying that the token is expired. If so it will remove the token.
   *
   * @see getMessage
   *
   * @param error the error found.
   * @param message the message of the error gathered in the 'getMessage' function.
   */
  checkIfExpiredToken(error: HttpErrorResponse, message: string): void {
    const msg = message.toLowerCase();
    if ((error.status === 401 || error.error.status === 401) && msg.includes('expired') && msg.includes('token')) {
      this.authService.deleteAuthorizationToken();
    }
  }
}
