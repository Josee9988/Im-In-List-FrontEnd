import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class AuthService {
  /**
   * The name of the local storage item that will be saving the token.
   */
  private readonly storageName: string = 'loginUserToken';

  private readonly storagePaypalName: string = '__paypal_storage__';

  constructor() { }

  /**
   * Gets the authorization token from the local storage, if so it will return the token,
   * otherwise it will return null.
   *
   * @returns string | null : String if the token was found, otherwise null.
   */
  getAuthorizationToken(): string | null {
    if (this.hasToken()) {
      return localStorage.getItem(this.storageName);
    }
    return null;
  }

  /**
   * Summary: saves the token received from the array
   *
   * @param token the token WITHOUT any prefixes like 'Bearer'. (the raw token).
   */
  saveAuthorizationToken(token: string): void {
    if (this.checkGivenToken(token)) {
      localStorage.removeItem(this.storageName);
      localStorage.setItem(this.storageName, 'Bearer ' + token);
    }
  }

  /**
   * Summary: removes the token from the localStorage.
   *
   * @return boolean; true if all ok, otherwise false.
   */
  deleteAuthorizationToken(): boolean {
    if (this.hasToken) {
      localStorage.removeItem(this.storageName);
      return true;
    }
    return false;
  }

  /**
   * Summary: removes the paypal token from the localStorage.
   */
  deletePaypalToken(): void {
    localStorage.removeItem(this.storagePaypalName);
  }

  /**
   * Summary: checks if the token exists and if so  returns true, otherwise false.
   *
   * @return boolean, true if the token exists otherwise false.
   */
  hasToken(): boolean {
    const lStorageItem: string = localStorage.getItem(this.storageName);
    return this.checkGivenToken(lStorageItem);
  }

  /**
   * Summary: receives a token and checks if it seems correct, if so it will return true,
   * if not false.
   *
   * @param token the token received that will be validated.
   * @return boolean, true if the token seems correct otherwise false.
   */
  checkGivenToken(token: string): boolean {
    if (token !== null && typeof token === 'string' && token.length > 250) {
      return true;
    }
    return false;
  }
}
