import { Injectable } from '@angular/core';

/** Mock client-side authentication/authorization service */
@Injectable()
export class AuthService {
  getAuthorizationToken() { // TODO: GET THE AUTH FROM THE LOCAL STORAGE
    return 'some-auth-token';
  }
}
