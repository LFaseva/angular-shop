import { TestBed, inject } from '@angular/core/testing';

import { DomService } from '@shared/services/DOMService';

describe('AppendComponentToBodyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomService]
    });
  });

  it('should be created', inject([DomService], (service: DomService) => {
    expect(service).toBeTruthy();
  }));
});
