import { TestBed } from '@angular/core/testing';

import { SessionManagmentService } from './session-managment.service';

describe('SessionManagmentService', () => {
  let service: SessionManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
