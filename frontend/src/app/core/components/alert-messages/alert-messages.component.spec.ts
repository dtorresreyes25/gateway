import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMessagesComponent } from './alert-messages.component';

describe('AlertMessagesComponent', () => {
  let component: AlertMessagesComponent;
  let fixture: ComponentFixture<AlertMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
