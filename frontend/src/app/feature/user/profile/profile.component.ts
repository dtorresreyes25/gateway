import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services';
import { User } from '../../../core/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  profileForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      _id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  createPasswordForm() {
    this.passwordForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.validationService.MustMatch(
          'newPassword',
          'confirmPassword'
        ),
      }
    );
  }

  resetProfileForm() {
    this.profileForm.reset();
    this.profileForm.patchValue(this.userService.getCurrentUser());
  }
  updateProfile() {
    this.userService.update(this.profileForm.value).subscribe(
      (data: User) => {
        this.toastrService.success('Profile updated successful');
        const user = data;
        user.token = this.user.token;
        localStorage.setItem('currentUser', JSON.stringify(user));
      },
      (error: any) => {}
    );
  }

  resetPasswordForm() {
    this.passwordForm.reset();
    this.passwordForm.get('username')?.patchValue(this.user.username);
  }
  updatePassword() {
    this.userService
      .changePassword(
        this.user._id,
        this.passwordForm.get('oldPassword')?.value,
        this.passwordForm.get('newPassword')?.value
      )
      .subscribe(
        (data: string) => {
          this.toastrService.success('Profile updated successful');
          this.router.navigate(['/login']);
        },
        (error: any) => {}
      );
  }

  ngOnInit(): void {
    this.createProfileForm();
    this.createPasswordForm();
    this.user = this.userService.getCurrentUser();
    this.profileForm.patchValue(this.user);
    this.passwordForm.get('username')?.patchValue(this.user.username);
  }
}
