import { TestBed } from '@angular/core/testing';

import { RefreshNavbarCommunication } from './refresh-navbar.service';

describe('NavbarLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefreshNavbarCommunication = TestBed.get(RefreshNavbarCommunication);
    expect(service).toBeTruthy();
  });
});
