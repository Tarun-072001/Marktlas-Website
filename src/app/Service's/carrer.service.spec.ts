import { TestBed } from '@angular/core/testing';

import { CarrerService } from './carrer.service';

describe('CarrerService', () => {
  let service: CarrerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
