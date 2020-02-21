import { HttpRequest, HttpResponse } from '@angular/common/http';

export abstract class RequestCache {
    abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;
    abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void;
}
