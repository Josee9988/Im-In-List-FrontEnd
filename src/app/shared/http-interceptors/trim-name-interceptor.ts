import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class TrimNameInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const body = req.body;
        if (!body || !body.name) {
            return next.handle(req);
        }
        // copy the body and trim whitespace from the name property
        const newBody = { ...body, name: body.name.trim() };
        // clone request and set its body
        const newReq = req.clone({ body: newBody });
        // send the cloned request to the next handler.
        return next.handle(newReq);
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
