import { TestBed } from '@angular/core/testing';

import { DeckApiService } from './deck-api.service';

describe('DeckApiService', () => {
  let service: DeckApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
