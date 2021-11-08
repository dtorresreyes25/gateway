import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GatewayDetailsComponent } from './gateway-details.component';

describe('ContactDetailsComponent', () => {
  let component: GatewayDetailsComponent;
  let fixture: ComponentFixture<GatewayDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GatewayDetailsComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
