import { TestBed } from '@angular/core/testing';

import { VetStateService } from './vet-state.service';

describe('VetStateService', () => {
  let service: VetStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VetStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
