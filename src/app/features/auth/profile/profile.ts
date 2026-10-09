import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  NgIf
} from '@angular/common';

import {
  AuthService,
  AuthUser
} from '../../../core/services/auth';


@Component({
  selector: 'app-profile',
  standalone: true,

  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './profile.html'
})
export class Profile implements OnInit {

  private readonly authService =
    inject(AuthService);

  private readonly fb =
    inject(FormBuilder);

  private readonly router =
    inject(Router);


  // USER

  currentUser: AuthUser | null = null;




  isEditing = false;

  isSaving = false;

  successMessage = '';

  errorMessage = '';


 

  profileForm =
    this.fb.nonNullable.group({

      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(7)
        ]
      ]

    });


  // INIT
  ngOnInit(): void {

    this.loadProfile();

  }


  // LOAD PROFILE
  loadProfile(): void {

    this.currentUser =
      this.authService.getCurrentUser();


    if (!this.currentUser) {

      this.router.navigate(['/auth/login']);

      return;

    }


    this.profileForm.patchValue({

      firstName:
        this.currentUser.firstName,

      lastName:
        this.currentUser.lastName,

      phone:
        this.currentUser.phone

    });

  }


  // INITIAL
  get userInitial(): string {

    return (
      this.currentUser?.firstName
        ?.charAt(0)
        ?.toUpperCase() || 'U'
    );

  }


  // FULL NAME
  get userFullName(): string {

    if (!this.currentUser) {

      return '';

    }


    return `${this.currentUser.firstName} ${this.currentUser.lastName}`;

  }


  // START EDIT
  startEditing(): void {

    this.successMessage = '';

    this.errorMessage = '';

    this.isEditing = true;

  }


  // CANCEL EDIT
  cancelEditing(): void {

    if (!this.currentUser) {

      return;

    }


    this.profileForm.patchValue({

      firstName:
        this.currentUser.firstName,

      lastName:
        this.currentUser.lastName,

      phone:
        this.currentUser.phone

    });


    this.successMessage = '';

    this.errorMessage = '';

    this.isEditing = false;

  }


  // SAVE PROFILE
  saveProfile(): void {

    this.successMessage = '';

    this.errorMessage = '';




    if (this.profileForm.invalid) {

      this.profileForm.markAllAsTouched();

      return;

    }


  
    this.isSaving = true;


   

    this.authService
      .updateProfile(
        this.profileForm.getRawValue()
      )
      .subscribe({



        next: (updatedUser: AuthUser) => {

          this.currentUser =
            updatedUser;


          this.isEditing = false;

          this.isSaving = false;


          this.successMessage =
            'Your profile has been updated successfully.';

        },



        error: (error: unknown) => {

          console.error(
            'Profile update failed:',
            error
          );


          if (error instanceof Error) {

            this.errorMessage =
              error.message;

          } else {

            this.errorMessage =
              'Unable to update your profile. Please try again.';

          }


          this.isSaving = false;

        }

      });

  }


  

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/auth/login']);

  }

}