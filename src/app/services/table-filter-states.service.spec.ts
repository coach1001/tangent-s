import { TestBed, inject } from '@angular/core/testing';

import { TableFilterStatesService } from './table-filter-states.service';

describe('TableFilterStatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableFilterStatesService]
    });
  });

  it('should be created', inject([TableFilterStatesService], (service: TableFilterStatesService) => {
    expect(service).toBeTruthy();
  }));
});
