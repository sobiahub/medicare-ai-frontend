import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Appointment {
  id: number;
  patientName: string;
  patientInitials: string;
  doctorName: string;
  doctorInitials: string;
  department: string;
  date: string;
  time: string;
  type: 'In-person' | 'Online';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class Appointments {

  searchTerm = '';

  selectedStatus = 'All Status';

  selectedDepartment = 'All Departments';

  selectedDate = 'All Dates';


  // APPOINTMENTS
  appointments: Appointment[] = [

    {
      id: 1,
      patientName: 'Ali Hassan',
      patientInitials: 'AH',
      doctorName: 'Dr. Ahmed Khan',
      doctorInitials: 'AK',
      department: 'Cardiology',
      date: '13 Aug 2026',
      time: '09:30 AM',
      type: 'In-person',
      status: 'Confirmed',
    },

    {
      id: 2,
      patientName: 'Ayesha Malik',
      patientInitials: 'AM',
      doctorName: 'Dr. Sara Ahmed',
      doctorInitials: 'SA',
      department: 'Dermatology',
      date: '13 Aug 2026',
      time: '10:00 AM',
      type: 'In-person',
      status: 'Pending',
    },

    {
      id: 3,
      patientName: 'Usman Tariq',
      patientInitials: 'UT',
      doctorName: 'Dr. Hamza Ali',
      doctorInitials: 'HA',
      department: 'Neurology',
      date: '13 Aug 2026',
      time: '11:30 AM',
      type: 'Online',
      status: 'Confirmed',
    },

    {
      id: 4,
      patientName: 'Hina Shah',
      patientInitials: 'HS',
      doctorName: 'Dr. Maria Khan',
      doctorInitials: 'MK',
      department: 'Pediatrics',
      date: '14 Aug 2026',
      time: '09:00 AM',
      type: 'In-person',
      status: 'Confirmed',
    },

    {
      id: 5,
      patientName: 'Bilal Ahmed',
      patientInitials: 'BA',
      doctorName: 'Dr. Ahmed Khan',
      doctorInitials: 'AK',
      department: 'Cardiology',
      date: '14 Aug 2026',
      time: '01:00 PM',
      type: 'In-person',
      status: 'Completed',
    },

    {
      id: 6,
      patientName: 'Maryam Khan',
      patientInitials: 'MK',
      doctorName: 'Dr. Sara Ahmed',
      doctorInitials: 'SA',
      department: 'Dermatology',
      date: '15 Aug 2026',
      time: '03:30 PM',
      type: 'Online',
      status: 'Pending',
    },

    {
      id: 7,
      patientName: 'Omar Farooq',
      patientInitials: 'OF',
      doctorName: 'Dr. Hamza Ali',
      doctorInitials: 'HA',
      department: 'Neurology',
      date: '15 Aug 2026',
      time: '04:00 PM',
      type: 'In-person',
      status: 'Cancelled',
    },

  ];


  // FILTERED APPOINTMENTS
  get filteredAppointments(): Appointment[] {

    const search = this.searchTerm
      .trim()
      .toLowerCase();

    return this.appointments.filter((appointment) => {

      const matchesSearch =
        !search ||
        appointment.patientName
          .toLowerCase()
          .includes(search) ||
        appointment.doctorName
          .toLowerCase()
          .includes(search) ||
        appointment.department
          .toLowerCase()
          .includes(search);


      const matchesStatus =
        this.selectedStatus === 'All Status' ||
        appointment.status === this.selectedStatus;


      const matchesDepartment =
        this.selectedDepartment === 'All Departments' ||
        appointment.department === this.selectedDepartment;


      const matchesDate =
        this.selectedDate === 'All Dates' ||
        appointment.date === this.selectedDate;


      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment &&
        matchesDate
      );

    });

  }


  // SUMMARY COUNTS
  get confirmedAppointments(): number {

    return this.appointments.filter(
      appointment => appointment.status === 'Confirmed'
    ).length;

  }


  get pendingAppointments(): number {

    return this.appointments.filter(
      appointment => appointment.status === 'Pending'
    ).length;

  }


  get completedAppointments(): number {

    return this.appointments.filter(
      appointment => appointment.status === 'Completed'
    ).length;

  }


  get cancelledAppointments(): number {

    return this.appointments.filter(
      appointment => appointment.status === 'Cancelled'
    ).length;

  }


  get hasFilters(): boolean {

    return !!(
      this.searchTerm ||
      this.selectedStatus !== 'All Status' ||
      this.selectedDepartment !== 'All Departments' ||
      this.selectedDate !== 'All Dates'
    );

  }


  // FILTER ACTIONS
  clearFilters(): void {

    this.searchTerm = '';

    this.selectedStatus = 'All Status';

    this.selectedDepartment = 'All Departments';

    this.selectedDate = 'All Dates';

  }


  // ACTIONS
  addAppointment(): void {

    console.log('Add appointment');

  }


  viewAppointment(appointment: Appointment): void {

    console.log('View appointment:', appointment);

  }


  editAppointment(appointment: Appointment): void {

    console.log('Edit appointment:', appointment);

  }


  cancelAppointment(appointment: Appointment): void {

    if (appointment.status === 'Cancelled') {
      return;
    }

    const confirmed = window.confirm(
      `Cancel appointment for ${appointment.patientName}?`
    );

    if (!confirmed) {
      return;
    }

    appointment.status = 'Cancelled';

  }

}