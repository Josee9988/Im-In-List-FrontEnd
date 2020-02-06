import { TestBed } from '@angular/core/testing';

import { SnackbarDisplayerService } from './snackbar-displayer.service';

describe('SnackbarDisplayerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SnackbarDisplayerService = TestBed.get(SnackbarDisplayerService);
    expect(service).toBeTruthy();
  });
});
