import { TestBed } from '@angular/core/testing';

import { PostRestService } from './post-rest.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PostRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: PostRestService = TestBed.get(PostRestService);
    expect(service).toBeTruthy();
  });
});
