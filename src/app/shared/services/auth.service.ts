import { Injectable } from '@angular/core';

@Injectable()

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class AuthService {

  /**
   * The name of the local storage item that will be saving the token.
   */
  private storageName: string;

  constructor() { this.storageName = 'loginUserToken'; }

  /**
   * Gets the authorization token from the local storage, if so it will return the token,
   * otherwise it will return null.
   *
   * @returns string | null : String if the token was found, otherwise null.
   */
  getAuthorizationToken(): string | null {
    if (this.hasToken) {
      return localStorage.getItem(this.storageName);
    }
    return null;
  }

  /**
   * Summary: removes the token from the localStorage.
   */
  deleteAuthorizationToken(): void {
    if (this.hasToken) {
      localStorage.removeItem(this.storageName);
    }
    return null;
  }

  /**
   * Summary: checks if the token exists and if so  returns true, otherwise false.
   *
   * @return boolean, true if the token exists otherwise false.
   */
  hasToken(): boolean {
    const lStorageItem: string = localStorage.getItem(this.storageName);
    if (lStorageItem !== null && typeof lStorageItem === 'string' && lStorageItem.length > 300) {
      return true;
    } else {
      return false;
    }
  }
}
