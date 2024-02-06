import { TestBed } from '@angular/core/testing';

import { UpdateRequestStateService } from './update-request-state.service';

describe('UpdateRequestStateService', () => {
  let service: UpdateRequestStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateRequestStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
