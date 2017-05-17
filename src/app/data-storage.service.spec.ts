import { TestBed, inject } from '@angular/core/testing';

import { DataStorageService } from './data-storage.service';

describe('DataStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataStorageService]
    });
  });

  it('should ...', inject([DataStorageService], (service: DataStorageService) => {
    expect(service).toBeTruthy();
  }));
});
