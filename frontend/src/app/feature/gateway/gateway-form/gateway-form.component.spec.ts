import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GatewayFormComponent } from './gateway-form.component';

describe('ContactFormComponent', () => {
  let component: GatewayFormComponent;
  let fixture: ComponentFixture<GatewayFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GatewayFormComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
