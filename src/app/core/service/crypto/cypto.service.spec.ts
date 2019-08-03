/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CyptoService } from './cypto.service';

describe('Service: Cypto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CyptoService]
    });
  });

  it('should ...', inject([CyptoService], (service: CyptoService) => {
    expect(service).toBeTruthy();
  }));
});
