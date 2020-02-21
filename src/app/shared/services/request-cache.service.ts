import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { SnackbarDisplayerService } from './snackbar-displayer.service';
import { SnackBarErrorType } from '../enums/snackbar-error-type.enum';
import { RequestCache } from '../classes/RequestCache.class';
import { IRequestCacheEntry } from '../models/IRequestCacheEntry.interface';

@Injectable({
  providedIn: 'root',
})

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class RequestCacheWithMap implements RequestCache {
  private maxAge = 10000; // maximum cache age (ms)

  cache = new Map<string, IRequestCacheEntry>();

  constructor(private errorSnackbarDisplayerService: SnackbarDisplayerService) { }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);
    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - this.maxAge);
    const expired = isExpired ? 'expired ' : '';
    this.errorSnackbarDisplayerService.openSnackBar(`Los datos mostrados ${expired}han sido recibidos de la memoria.`,
      SnackBarErrorType.informational);
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;

    // this.errorSnackbarDisplayerService.openSnackBar(`Caching response from "${url}".`, SnackBarErrorType.informational);
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    // remove expired cache entries
    const expired = Date.now() - this.maxAge;
    // tslint:disable-next-line: no-shadowed-variable
    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });

    // console.log(`Request cache size: ${this.cache.size}.`);
  }
}
