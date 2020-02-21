import { HttpResponse } from '@angular/common/http';

export interface IRequestCacheEntry {
    url: string;
    response: HttpResponse<any>;
    lastRead: number;
}
