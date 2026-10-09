import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import {
  AppointmentService,
  Appointment,
  Doctor
} from '../../../core/services/appointments';
import { Navbar } from '../../landing/sections/navbar/navbar';
import { Footer } from '../../landing/sections/footer/footer';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    Navbar,
    Footer,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './appointments.html'
})
export class Appointments implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly appointmentService =
    inject(AppointmentService);


  // DATA
  appointments: Appointment[] = [];

  doctors: Doctor[] = [];

  currentUser: any = null;

  isLoggedIn = false;

  showBookingForm = false;

  isSubmitting = false;

  successMessage = '';

  errorMessage = '';

  activeTab: 'upcoming' | 'past' = 'upcoming';


  // FORM
  bookingForm: FormGroup = this.fb.group({

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

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[0-9+\-\s]{10,15}$/
        )
      ]
    ],

    doctorId: [
      '',
      Validators.required
    ],

    date: [
      '',
      Validators.required
    ],

    time: [
      '',
      Validators.required
    ],

    reason: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(300)
      ]
    ]

  });


  // INIT
  ngOnInit(): void {

    this.loadCurrentUser();

    this.loadDoctors();

    this.loadAppointments();

    this.prefillUser();

  }


  // CURRENT USER
  private loadCurrentUser(): void {

    if (typeof window === 'undefined') {
      return;
    }

    const storedUser =
      localStorage.getItem(
        'dhm_current_user'
      );

    if (!storedUser) {

      this.isLoggedIn = false;

      return;
    }

    try {

      this.currentUser =
        JSON.parse(storedUser);

      this.isLoggedIn =
        !!this.currentUser;

    } catch {

      this.currentUser = null;

      this.isLoggedIn = false;

    }

  }


  // PREFILL LOGGED-IN USER
  private prefillUser(): void {

    if (!this.currentUser) {
      return;
    }

    this.bookingForm.patchValue({

      firstName:
        this.currentUser.firstName ?? '',

      lastName:
        this.currentUser.lastName ?? '',

      email:
        this.currentUser.email ?? '',

      phone:
        this.currentUser.phone ?? ''

    });

  }


  // DOCTORS
  private loadDoctors(): void {

    this.appointmentService
      .getDoctors()
      .subscribe({

        next: (doctors) => {

          this.doctors = doctors;

        },

        error: (error) => {

          this.errorMessage =
            error?.message ||
            'Unable to load doctors.';

        }

      });

  }


  // APPOINTMENTS
  private loadAppointments(): void {

    this.appointmentService
      .getAppointments()
      .subscribe({

        next: (appointments) => {

          this.appointments =
            appointments;

        },

        error: (error) => {

          this.errorMessage =
            error?.message ||
            'Unable to load appointments.';

        }

      });

  }


  // GETTERS
  get upcomingAppointments(): Appointment[] {

    return this.appointments.filter(
      appointment =>
        appointment.status === 'Upcoming'
    );

  }


  get pastAppointments(): Appointment[] {

    return this.appointments.filter(
      appointment =>
        appointment.status === 'Completed' ||
        appointment.status === 'Cancelled'
    );

  }


  get displayedAppointments(): Appointment[] {

    return this.activeTab === 'upcoming'
      ? this.upcomingAppointments
      : this.pastAppointments;

  }


  get selectedDoctor(): Doctor | undefined {

    const doctorId =
      Number(
        this.bookingForm.get('doctorId')?.value
      );

    return this.doctors.find(
      doctor =>
        doctor.id === doctorId
    );

  }


  // BOOK APPOINTMENT
  bookAppointment(): void {

    this.errorMessage = '';

    this.successMessage = '';


    if (this.bookingForm.invalid) {

      this.bookingForm.markAllAsTouched();

      return;
    }


    if (this.isSubmitting) {
      return;
    }


    this.isSubmitting = true;


    this.appointmentService
      .createAppointment(
        this.bookingForm.getRawValue()
      )
      .subscribe({

        next: (appointment) => {

          this.appointments.unshift(
            appointment
          );


          this.isSubmitting = false;

          this.showBookingForm = false;

          this.activeTab = 'upcoming';


          this.successMessage =
            'Your appointment has been booked successfully.';


          this.bookingForm.reset();

          this.prefillUser();


          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

        },


        error: (error) => {

          this.isSubmitting = false;

          this.errorMessage =
            error?.message ||
            'Unable to book appointment.';

        }

      });

  }


  // CANCEL APPOINTMENT
  cancelAppointment(
    appointment: Appointment
  ): void {

    const confirmed =
      window.confirm(
        'Are you sure you want to cancel this appointment?'
      );


    if (!confirmed) {
      return;
    }


    this.appointmentService
      .cancelAppointment(
        appointment.id
      )
      .subscribe({

        next: (updatedAppointment) => {

          const index =
            this.appointments.findIndex(
              item =>
                item.id ===
                updatedAppointment.id
            );


          if (index !== -1) {

            this.appointments[index] =
              updatedAppointment;

          }


          this.successMessage =
            'Your appointment has been cancelled.';

        },


        error: (error) => {

          this.errorMessage =
            error?.message ||
            'Unable to cancel appointment.';

        }

      });

  }


  // BOOKING FORM
  openBookingForm(): void {

    this.errorMessage = '';

    this.successMessage = '';

    this.showBookingForm = true;


    setTimeout(() => {

      document
        .getElementById('booking-form')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

    }, 50);

  }


  closeBookingForm(): void {

    if (this.isSubmitting) {
      return;
    }

    this.showBookingForm = false;

    this.errorMessage = '';

  }


  // TABS
  setTab(
    tab: 'upcoming' | 'past'
  ): void {

    this.activeTab = tab;

  }


  // HELPERS
  getToday(): string {

    return this.appointmentService
      .getToday();

  }


  formatDate(
    date: string
  ): string {

    return this.appointmentService
      .formatDate(date);

  }


  isInvalid(
    field: string
  ): boolean {

    const control =
      this.bookingForm.get(field);

    return !!(
      control &&
      control.invalid &&
      control.touched
    );

  }


  // AUTH NAVIGATION
  goToLogin(): void {

    this.router.navigate(
      ['/auth/login'],
      {
        queryParams: {
          returnUrl: '/appointments'
        }
      }
    );

  }


  goToRegister(): void {

    this.router.navigate(
      ['/auth/register'],
      {
        queryParams: {
          returnUrl: '/appointments'
        }
      }
    );

  }

}