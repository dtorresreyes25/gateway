import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Injectable()
export class ValidationService {
  constructor() {}

  public getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config: any = {
      required: 'Required',
      invalidIp: 'Is invalid IP',
      invalidEmailAddress: 'Invalid email address',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      maxlength: `Max length ${validatorValue.requiredLength}`,
      mustMatch: 'Passwords must match',
    };
    return config[validatorName];
  }

  public emailValidator(control: any) {
    // tslint:disable-next-line:max-line-length
    if (
      control.value.match(
        /[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  public ipValidator(control: any) {
    if (
      control.value.match(
        '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$'
      )
    ) {
      return null;
    } else {
      return { invalidIp: true };
    }
  }
  public MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
