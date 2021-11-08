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
      devices: this.getDevicesReadyToSave(gateway.devices),
    };
    if (gateway._id) {
      this.update(updatedGateway);
    } else {
      delete updatedGateway._id;
      console.log(updatedGateway);
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
      gatewayDetails.devices = this.getDevicesReadyToSave(
        gatewayDetails.devices
      );
      this.gatewayForm.patchValue(gatewayDetails);
    }
  }

  public devices(): FormArray {
    return this.gatewayForm.get('devices') as FormArray;
  }

  public newDevice(): FormGroup {
    return this.formBuilder.group({
      _id: [''],
      vendor: ['', Validators.required],
      status: false,
    });
  }

  public addDevice(): void {
    this.devices().push(this.newDevice());
  }

  public removeDevice(deviceId: number): void {
    this.devices().removeAt(deviceId);
  }

  private getDevicesReadyToSave(devices: any[]) {
    return devices.map((d: any, i: number) => {
      let isChecked = false;
      const device = Object.assign({}, d);
      if (!device._id) {
        delete device._id;
      }
      if (
        typeof device.status === 'string' &&
        device.status === 'online' &&
        !isChecked
      ) {
        device.status = true;
        isChecked = true;
      }
      if (
        typeof device.status === 'string' &&
        device.status === 'offline' &&
        !isChecked
      ) {
        device.status = false;
        isChecked = true;
      }
      if (
        typeof device.status !== 'string' &&
        device.status === true &&
        !isChecked
      ) {
        device.status = 'online';
        isChecked = true;
      }
      if (
        typeof device.status !== 'string' &&
        device.status === false &&
        !isChecked
      ) {
        device.status = 'offline';
        isChecked = true;
      }
      return {
        ...device,
      };
    });
  }
}
