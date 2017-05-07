import { TestBed, inject } from '@angular/core/testing';

import { ImageManagementService } from './image-management.service';

describe('ImageManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageManagementService]
    });
  });

  it('should ...', inject([ImageManagementService], (service: ImageManagementService) => {
    expect(service).toBeTruthy();
  }));
});
