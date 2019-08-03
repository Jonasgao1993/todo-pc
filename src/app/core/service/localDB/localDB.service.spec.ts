/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalDBService } from './localDB.service';

describe('Service: LocalDB', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalDBService]
    });
  });

  it('should ...', inject([LocalDBService], (service: LocalDBService) => {
    expect(service).toBeTruthy();
  }));
});
