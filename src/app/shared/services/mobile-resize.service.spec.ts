import { TestBed } from '@angular/core/testing';

import { MobileResizeService } from './mobile-resize.service';

describe('MobileResizeService', () => {
  let service: MobileResizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileResizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
