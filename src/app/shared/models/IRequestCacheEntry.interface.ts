import { HttpResponse } from '@angular/common/http';

/**
 * Summary: This interface export the url, the response and the number about when was lastRead
 */
export interface IRequestCacheEntry {
    url: string;
    response: HttpResponse<any>;
    lastRead: number;
}
