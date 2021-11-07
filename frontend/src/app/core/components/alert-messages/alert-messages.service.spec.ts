import { TestBed } from '@angular/core/testing';

import { AlertMessagesService } from './alert-messages.service';

describe('AlertMessagesService', () => {
  let service: AlertMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
