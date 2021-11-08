import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceBadgeComponent } from './device-badges.component';

describe('DeviceBadgeComponent', () => {
  let component: DeviceBadgeComponent;
  let fixture: ComponentFixture<DeviceBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceBadgeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
