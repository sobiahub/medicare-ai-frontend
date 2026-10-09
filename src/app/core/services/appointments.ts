import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  department: string;
  experience: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  doctorId: number;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  reason: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface CreateAppointmentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  doctorId: number;
  date: string;
  time: string;
  reason: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private readonly platformId = inject(PLATFORM_ID);

  private readonly APPOINTMENTS_KEY = 'dhm_appointments';


 

  private readonly doctors: Doctor[] = [

    {
      id: 1,
      name: 'Dr. Sarah Ahmed',
      specialty: 'Cardiologist',
      department: 'Cardiology',
      experience: '12 years',
      available: true
    },

    {
      id: 2,
      name: 'Dr. Hamza Malik',
      specialty: 'Neurologist',
      department: 'Neurology',
      experience: '10 years',
      available: true
    },

    {
      id: 3,
      name: 'Dr. Ayesha Khan',
      specialty: 'Dermatologist',
      department: 'Dermatology',
      experience: '8 years',
      available: true
    },

    {
      id: 4,
      name: 'Dr. Ali Hassan',
      specialty: 'General Physician',
      department: 'General Medicine',
      experience: '9 years',
      available: true
    },

    {
      id: 5,
      name: 'Dr. Maria Fatima',
      specialty: 'Pediatrician',
      department: 'Pediatrics',
      experience: '11 years',
      available: true
    }

  ];




  getDoctors(): Observable<Doctor[]> {

    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }

    return of(this.doctors).pipe(
      delay(300)
    );

  }


  

  getDoctorById(
    doctorId: number
  ): Doctor | undefined {

    return this.doctors.find(
      doctor => doctor.id === doctorId
    );

  }




  getAppointments(): Observable<Appointment[]> {

    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }

    const appointments =
      this.getStoredAppointments();

    return of(appointments).pipe(
      delay(300)
    );

  }


 

  createAppointment(
    data: CreateAppointmentRequest
  ): Observable<Appointment> {

    if (!isPlatformBrowser(this.platformId)) {

      return throwError(
        () =>
          new Error(
            'Appointments are only available in the browser.'
          )
      );

    }


    const doctor =
      this.getDoctorById(
        Number(data.doctorId)
      );


    if (!doctor) {

      return throwError(
        () =>
          new Error(
            'Selected doctor was not found.'
          )
      );

    }


    const appointments =
      this.getStoredAppointments();


    const newAppointment: Appointment = {

      id: crypto.randomUUID(),

      patientName:
        `${data.firstName} ${data.lastName}`,

      email:
        data.email.toLowerCase(),

      phone:
        data.phone,

      doctorId:
        doctor.id,

      doctorName:
        doctor.name,

      department:
        doctor.department,

      date:
        data.date,

      time:
        data.time,

      reason:
        data.reason,

      status:
        'Upcoming',

      createdAt:
        new Date().toISOString()

    };


    appointments.unshift(
      newAppointment
    );


    this.saveAppointments(
      appointments
    );


    return of(
      newAppointment
    ).pipe(
      delay(700)
    );

  }



  cancelAppointment(
    appointmentId: string
  ): Observable<Appointment> {

    if (!isPlatformBrowser(this.platformId)) {

      return throwError(
        () =>
          new Error(
            'Appointments are only available in the browser.'
          )
      );

    }


    const appointments =
      this.getStoredAppointments();


    const index =
      appointments.findIndex(
        appointment =>
          appointment.id === appointmentId
      );


    if (index === -1) {

      return throwError(
        () =>
          new Error(
            'Appointment not found.'
          )
      );

    }


    if (
      appointments[index].status ===
      'Cancelled'
    ) {

      return throwError(
        () =>
          new Error(
            'This appointment is already cancelled.'
          )
      );

    }


    appointments[index] = {

      ...appointments[index],

      status: 'Cancelled'

    };


    this.saveAppointments(
      appointments
    );


    return of(
      appointments[index]
    ).pipe(
      delay(400)
    );

  }


 

  getUpcomingAppointments():
    Observable<Appointment[]> {

    return new Observable(
      subscriber => {

        this.getAppointments()
          .subscribe({

            next: appointments => {

              const upcoming =
                appointments.filter(
                  appointment =>
                    appointment.status ===
                    'Upcoming'
                );

              subscriber.next(
                upcoming
              );

              subscriber.complete();

            },

            error: error => {
              subscriber.error(error);
            }

          });

      }
    );

  }


 

  getPastAppointments():
    Observable<Appointment[]> {

    return new Observable(
      subscriber => {

        this.getAppointments()
          .subscribe({

            next: appointments => {

              const past =
                appointments.filter(
                  appointment =>
                    appointment.status ===
                      'Completed' ||
                    appointment.status ===
                      'Cancelled'
                );

              subscriber.next(
                past
              );

              subscriber.complete();

            },

            error: error => {
              subscriber.error(error);
            }

          });

      }
    );

  }



  getToday(): string {

    const today =
      new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        today.getDate()
      ).padStart(2, '0');

    return `${year}-${month}-${day}`;

  }


  

  formatDate(
    date: string
  ): string {

    if (!date) {
      return '';
    }

    return new Intl.DateTimeFormat(
      'en-US',
      {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    ).format(
      new Date(`${date}T00:00:00`)
    );

  }


 

  private getStoredAppointments():
    Appointment[] {

    if (
      !isPlatformBrowser(
        this.platformId
      )
    ) {

      return [];

    }


    const stored =
      localStorage.getItem(
        this.APPOINTMENTS_KEY
      );


    if (!stored) {
      return [];
    }


    try {

      const parsed =
        JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed;

    } catch {

      return [];

    }

  }


  private saveAppointments(
    appointments: Appointment[]
  ): void {

    if (
      !isPlatformBrowser(
        this.platformId
      )
    ) {

      return;

    }


    localStorage.setItem(
      this.APPOINTMENTS_KEY,
      JSON.stringify(
        appointments
      )
    );

  }

}