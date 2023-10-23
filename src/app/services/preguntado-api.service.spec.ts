import { TestBed } from '@angular/core/testing';

import { PreguntadoApiService } from './preguntado-api.service';

describe('PreguntadoApiService', () => {
  let service: PreguntadoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntadoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
