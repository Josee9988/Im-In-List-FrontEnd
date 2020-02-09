import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { SnackbarDisplayerService } from '../../shared/services/snackbar-displayer.service';
import { SnackBarErrorType } from '../enums/snackbar-error-type.enum';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor(private errorSnackbarDisplayerService: SnackbarDisplayerService) { }

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
      const message: string = (error.error instanceof ErrorEvent) ?
        `server returned code ${error.status} with body: ${JSON.stringify(error.error.message)}` :
        error.toString();

      this.errorSnackbarDisplayerService.openSnackBar(`ERROR: ${serviceName}, ${operation} failed: ${message}.`, SnackBarErrorType.error);

      console.error(`HTTP_ERROR_HANDLER ERROR: ${serviceName}: ${operation} failed: ${message}.`);

      // Let the app keep running by returning a safe result.
      return of(result);
    };
  }
}
