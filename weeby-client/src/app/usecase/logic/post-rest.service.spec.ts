import { TestBed } from '@angular/core/testing';

import { PostRestService } from './post-rest.service';

describe('PostRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostRestService = TestBed.get(PostRestService);
    expect(service).toBeTruthy();
  });
});
