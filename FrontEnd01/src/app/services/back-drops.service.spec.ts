import { TestBed } from '@angular/core/testing';

import { BackDropsService } from './back-drops.service';

describe('BackDropsService', () => {
  let service: BackDropsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackDropsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
