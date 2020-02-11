import { Injectable } from '@angular/core';

@Injectable()

/**
 * @author Jose Gracia Berenguer <jgracia9988@gmail.com>
 */
export class AuthService {

  /**
   * Gets the authorization token from the local storage, if so it will return the token,
   * otherwise it will return null.
   *
   * @returns string | null : String if the token was found, otherwise null.
   */
  getAuthorizationToken(): string | null {
    if (localStorage.getItem('loginUserToken')) {
      return localStorage.getItem('loginUserToken');
    }
    return null;
  }

  /**
   * Summary: removes the token from the localStorage.
   */
  deleteAuthorizationToken(): void {
    if (localStorage.getItem('loginUserToken')) {
      localStorage.removeItem('loginUserToken');
    }
    return null;
  }
}
