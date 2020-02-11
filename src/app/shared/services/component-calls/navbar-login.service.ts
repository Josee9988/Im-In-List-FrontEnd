import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() { }

  protected observable = new Subject<any>();

  public next(item: any) {
    this.observable.next(item);
  }

  public subscribe(callback: (item: any) => void) {
    this.observable.subscribe(callback);
  }
}
