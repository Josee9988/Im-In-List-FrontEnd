import { Injectable } from '@angular/core';

/** Mock client-side authentication/authorization service */
@Injectable()
export class AuthService {
  getAuthorizationToken() {
    if (localStorage.getItem('loginUserToken')) {
      return localStorage.getItem('loginUserToken');
    }
    return null;
  }
}
