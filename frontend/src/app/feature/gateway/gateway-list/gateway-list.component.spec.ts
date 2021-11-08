import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GatewayListComponent } from './gateway-list.component';

describe('gatewayListComponent', () => {
  let component: GatewayListComponent;
  let fixture: ComponentFixture<GatewayListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GatewayListComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
