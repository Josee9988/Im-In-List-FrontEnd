import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { SnackbarDisplayerService } from './snackbar-displayer.service';
import { SnackBarErrorType } from '../enums/snackbar-error-type.enum';

export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

export abstract class RequestCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;
  abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void;
}

const maxAge = 30000; // maximum cache age (ms)

@Injectable()
export class RequestCacheWithMap implements RequestCache {

  cache = new Map<string, RequestCacheEntry>();

  constructor(private httpErrorHandler: HttpErrorHandler, private errorSnackbarDisplayerService: SnackbarDisplayerService) { }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : '';
    this.errorSnackbarDisplayerService.openSnackBar(`Found ${expired}cached response for "${url}".`, SnackBarErrorType.informational);
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;

    this.errorSnackbarDisplayerService.openSnackBar(`Caching response from "${url}".`, SnackBarErrorType.informational);
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    // remove expired cache entries
    const expired = Date.now() - maxAge;
    // tslint:disable-next-line: no-shadowed-variable
    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });

    this.errorSnackbarDisplayerService.openSnackBar(`Request cache size: ${this.cache.size}.`, SnackBarErrorType.informational);
  }
}
