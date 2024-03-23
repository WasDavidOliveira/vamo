import { TestBed } from '@angular/core/testing';

import { ActualpageService } from './actualpage.service';

describe('ActualpageService', () => {
  let service: ActualpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
