import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword implements OnInit {

  

  private readonly fb = inject(FormBuilder);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  private readonly authService = inject(AuthService);




  resetForm: FormGroup;



  email = '';

  resetToken = '';


 

  isSubmitting = false;

  errorMessage = '';

  successMessage = '';



  showPassword = false;

  showConfirmPassword = false;



  constructor() {

    this.resetForm = this.fb.group(
      {

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
            )
          ]
        ],

        confirmPassword: [
          '',
          [
            Validators.required
          ]
        ]

      },
      {
        validators: this.passwordMatchValidator
      }
    );

  }



  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      this.email =
        params['email'] ?? '';

      this.resetToken =
        params['token'] ?? '';


      /*
       * Reset password should only be accessible
       * after successful code verification.
       */

      if (
        !this.email ||
        !this.resetToken
      ) {

        this.router.navigate([
          '/auth/forgot-password'
        ]);

      }

    });

  }



  get password(): AbstractControl | null {

    return this.resetForm.get('password');

  }


  get confirmPassword(): AbstractControl | null {

    return this.resetForm.get('confirmPassword');

  }


  

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password =
      control.get('password')?.value;

    const confirmPassword =
      control.get('confirmPassword')?.value;


    if (
      !password ||
      !confirmPassword
    ) {

      return null;

    }


    return password === confirmPassword
      ? null
      : {
          passwordMismatch: true
        };

  }



  hasMinLength(): boolean {

    const value =
      this.password?.value ?? '';

    return value.length >= 8;

  }


  hasLowercase(): boolean {

    const value =
      this.password?.value ?? '';

    return /[a-z]/.test(value);

  }


  hasUppercase(): boolean {

    const value =
      this.password?.value ?? '';

    return /[A-Z]/.test(value);

  }


  hasNumber(): boolean {

    const value =
      this.password?.value ?? '';

    return /\d/.test(value);

  }


  passwordsMatch(): boolean {

    const password =
      this.password?.value ?? '';

    const confirmPassword =
      this.confirmPassword?.value ?? '';


    return (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    );

  }


 

  isPasswordInvalid(): boolean {

    return !!(
      this.password &&
      this.password.invalid &&
      this.password.touched
    );

  }


 

  isConfirmPasswordInvalid(): boolean {

    return !!(
      this.confirmPassword &&
      (
        this.confirmPassword.invalid ||
        this.resetForm.hasError('passwordMismatch')
      ) &&
      this.confirmPassword.touched
    );

  }



  togglePassword(): void {

    this.showPassword =
      !this.showPassword;

  }



  toggleConfirmPassword(): void {

    this.showConfirmPassword =
      !this.showConfirmPassword;

  }



  resetPassword(): void {

    this.errorMessage = '';

    this.successMessage = '';


 

    if (
      !this.email ||
      !this.resetToken
    ) {

      this.errorMessage =
        'This password reset session is invalid or has expired.';

      return;

    }


   

    if (this.resetForm.invalid) {

      this.resetForm.markAllAsTouched();

      return;

    }


   
    if (this.isSubmitting) {
      return;
    }


    this.isSubmitting = true;


    const newPassword =
      this.password?.value;



    this.authService
      .resetPassword({

        email: this.email,

        resetToken:
          this.resetToken,

        password:
          newPassword

      })
      .subscribe({

       

        next: (response) => {

          this.isSubmitting = false;


          this.successMessage =
            response?.message ??
            'Your password has been reset successfully.';


          /*
           * Give the user a moment to see the
           * successful reset message.
           */

          setTimeout(() => {

            this.router.navigate(
              ['/auth/login'],
              {
                queryParams: {
                  passwordReset: 'success'
                }
              }
            );

          }, 1200);

        },


       

        error: (error) => {

          this.isSubmitting = false;


          this.errorMessage =
            error?.message ??
            'Unable to reset your password. Please try again.';

        }

      });

  }


  

  goBack(): void {

    if (this.isSubmitting) {
      return;
    }


    this.router.navigate([
      '/auth/verify-code'
    ], {
      queryParams: {
        email: this.email
      }
    });

  }

}