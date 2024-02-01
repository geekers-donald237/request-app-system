import { TestBed } from '@angular/core/testing';

import { RequestPatternService } from './request-pattern.service';

describe('RequestPatternService', () => {
  let service: RequestPatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestPatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
