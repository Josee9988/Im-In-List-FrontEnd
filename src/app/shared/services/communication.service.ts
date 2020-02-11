import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class CommunicationService {

  constructor() { }

  private observable: Subject<any> = new Subject<any>();

  public next(item: any) {
    this.observable.next(item);
  }

  public subscribe(callback: (item: any) => void) {
    this.observable.subscribe(callback);
  }
}
