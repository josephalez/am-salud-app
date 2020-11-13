import { TestBed } from '@angular/core/testing';

import { LaserZoneService } from './laser-zone.service';

describe('LaserZoneService', () => {
  let service: LaserZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaserZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
