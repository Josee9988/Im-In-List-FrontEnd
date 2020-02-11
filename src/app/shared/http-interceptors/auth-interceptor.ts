import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { AuthService } from '../services/auth.service';

@Injectable()

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

    if (authToken !== null) {
      const authReq = req.clone({ setHeaders: { Authorization: authToken } });
      return next.handle(authReq);

    }
    return next.handle(req);

  }
}
