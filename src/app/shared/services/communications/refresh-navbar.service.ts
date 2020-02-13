import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class RefreshNavbarCommunication {

  /**
   * Observable element.
   */
  private observable: Subject<any> = new Subject<any>();

  /**
   * Summary it is called by the component that emits the function, it may receive arguments.
   *
   * @param item the item passed from the caller.
   */
  public next(item: any) {
    this.observable.next(item);
  }

  /**
   * Summary: observable that the father will subscribe to.
   *
   * @param callback observable.
   */
  public subscribe(callback: (item: any) => void) {
    this.observable.subscribe(callback);
  }
}
