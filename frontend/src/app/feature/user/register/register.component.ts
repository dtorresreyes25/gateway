import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  loading = false;
  registerForm: FormGroup = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: this.validationService.MustMatch(
        'password',
        'confirmPassword'
      ),
    }
  );
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private validationService: ValidationService,
    private toastrService: ToastrService
  ) {}

  register(): void {
    this.loading = true;
    this.userService.create(this.registerForm.value).subscribe(
      (data: User) => {
        this.toastrService.success('Registration successful');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.toastrService.error(error.message);
        this.loading = false;
      }
    );
  }
}
