import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../core/components';
import { GatewayService } from '../../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Device, Gateway } from '../../../core/models';

@Component({
  selector: 'app-gateway-form',
  templateUrl: './gateway-form.component.html',
  styleUrls: ['./gateway-form.component.scss'],
})
export class GatewayFormComponent implements OnInit {
  public gatewayForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private validationService: ValidationService,
    private gatewayService: GatewayService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  public createForm(): void {
    this.gatewayForm = this.formBuilder.group({
      _id: ['', []],
      serial: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(35),
        ],
      ],
      human_readable_name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(35),
        ],
      ],
      ipv4_address: [
        '',
        [Validators.required, this.validationService.ipValidator],
      ],
      devices: this.formBuilder.array([]),
    });
  }

  public reset(): void {
    this.createForm();
  }

  public submit(): void {
    const gateway = this.gatewayForm.value;
    const updatedGateway = {
      ...gateway,
      devices: this.mapBooleanToStatusLabel(gateway.devices),
    };
    if (gateway._id) {
      this.update(updatedGateway);
    } else {
      delete gateway._id;
      this.save(updatedGateway);
    }
  }

  public save(gateway: Gateway): void {
    this.gatewayService.create(gateway).subscribe(
      (data) => {
        this.toastrService.success('gateway created successfully', 'Success');
        this.router.navigate(['/gateways']);
      },
      () => {
        this.toastrService.error('Error saving the gateway');
      }
    );
  }

  public update(gateway: Gateway): void {
    this.gatewayService.update(gateway).subscribe(
      (data) => {
        this.toastrService.success('gateway updated successfully', 'Success');
        this.router.navigate(['/gateways']);
      },
      () => {
        this.toastrService.error('Error updating the gateway');
      }
    );
  }

  ngOnInit(): void {
    this.createForm();
    const gatewayDetails: Gateway =
      this.activatedRoute.snapshot.data.gatewayDetails;
    if (gatewayDetails) {
      gatewayDetails.devices.forEach((_) => {
        this.devices().push(this.newDevice());
      });
      const updatedGatewayDetails = Object.assign({}, gatewayDetails);
      updatedGatewayDetails.devices = this.mapBooleanToStatusLabel(
        gatewayDetails.devices
      );
      this.gatewayForm.patchValue(updatedGatewayDetails);
    }
  }

  public devices(): FormArray {
    return this.gatewayForm.get('devices') as FormArray;
  }

  public newDevice(): FormGroup {
    return this.formBuilder.group({
      _id: [''],
      vendor: ['', Validators.required],
      status: [''],
    });
  }

  public addDevice(): void {
    this.devices().push(this.newDevice());
  }

  public removeDevice(deviceId: number): void {
    this.devices().removeAt(deviceId);
  }

  private mapBooleanToStatusLabel(devices: any[]) {
    return devices.map((device: any, i: number) => ({
      ...device,
      status:
        typeof device.status === 'string'
          ? device.status === 'online'
          : !!device.status
          ? 'online'
          : 'offline',
    }));
  }
}
