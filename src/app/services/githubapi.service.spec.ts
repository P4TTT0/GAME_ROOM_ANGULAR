import { TestBed } from '@angular/core/testing';

import { GithubapiService } from './githubapi.service';

describe('GithubapiService', () => {
  let service: GithubapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
