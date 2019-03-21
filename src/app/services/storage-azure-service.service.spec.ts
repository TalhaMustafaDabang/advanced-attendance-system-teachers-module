import { TestBed } from '@angular/core/testing';

import { StorageAzureServiceService } from './storage-azure-service.service';

describe('StorageAzureServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageAzureServiceService = TestBed.get(StorageAzureServiceService);
    expect(service).toBeTruthy();
  });
});
