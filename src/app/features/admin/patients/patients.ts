import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  age: number;
  bloodGroup: string;
  status: 'Active' | 'Inactive';
  registeredDate: string;
  initials: string;
}

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class Patients {

  searchTerm = '';

  selectedGender = 'All Gender';

  selectedStatus = 'All Status';


  patients: Patient[] = [

    {
      id: 1,
      name: 'Ali Hassan',
      email: 'ali.hassan@email.com',
      phone: '+92 300 1234567',
      gender: 'Male',
      age: 34,
      bloodGroup: 'B+',
      status: 'Active',
      registeredDate: '12 Aug 2026',
      initials: 'AH',
    },

    {
      id: 2,
      name: 'Ayesha Malik',
      email: 'ayesha.malik@email.com',
      phone: '+92 301 2345678',
      gender: 'Female',
      age: 28,
      bloodGroup: 'O+',
      status: 'Active',
      registeredDate: '10 Aug 2026',
      initials: 'AM',
    },

    {
      id: 3,
      name: 'Usman Tariq',
      email: 'usman.tariq@email.com',
      phone: '+92 302 3456789',
      gender: 'Male',
      age: 45,
      bloodGroup: 'A+',
      status: 'Active',
      registeredDate: '08 Aug 2026',
      initials: 'UT',
    },

    {
      id: 4,
      name: 'Hina Shah',
      email: 'hina.shah@email.com',
      phone: '+92 303 4567890',
      gender: 'Female',
      age: 31,
      bloodGroup: 'AB+',
      status: 'Active',
      registeredDate: '05 Aug 2026',
      initials: 'HS',
    },

    {
      id: 5,
      name: 'Bilal Ahmed',
      email: 'bilal.ahmed@email.com',
      phone: '+92 304 5678901',
      gender: 'Male',
      age: 52,
      bloodGroup: 'O-',
      status: 'Inactive',
      registeredDate: '01 Aug 2026',
      initials: 'BA',
    },

    {
      id: 6,
      name: 'Maryam Khan',
      email: 'maryam.khan@email.com',
      phone: '+92 305 6789012',
      gender: 'Female',
      age: 24,
      bloodGroup: 'A-',
      status: 'Active',
      registeredDate: '28 Jul 2026',
      initials: 'MK',
    },

  ];


  // FILTERED PATIENTS
  get filteredPatients(): Patient[] {

    const search = this.searchTerm
      .trim()
      .toLowerCase();

    return this.patients.filter((patient) => {

      const matchesSearch =
        !search ||
        patient.name.toLowerCase().includes(search) ||
        patient.email.toLowerCase().includes(search) ||
        patient.phone.toLowerCase().includes(search) ||
        patient.bloodGroup.toLowerCase().includes(search);


      const matchesGender =
        this.selectedGender === 'All Gender' ||
        patient.gender === this.selectedGender;


      const matchesStatus =
        this.selectedStatus === 'All Status' ||
        patient.status === this.selectedStatus;


      return (
        matchesSearch &&
        matchesGender &&
        matchesStatus
      );

    });

  }


  // COUNTS
  get activePatients(): number {

    return this.patients.filter(
      patient => patient.status === 'Active'
    ).length;

  }


  get inactivePatients(): number {

    return this.patients.filter(
      patient => patient.status === 'Inactive'
    ).length;

  }


  get hasFilters(): boolean {

    return !!(
      this.searchTerm ||
      this.selectedGender !== 'All Gender' ||
      this.selectedStatus !== 'All Status'
    );

  }


  // FILTER ACTIONS
  clearFilters(): void {

    this.searchTerm = '';

    this.selectedGender = 'All Gender';

    this.selectedStatus = 'All Status';

  }


  // ACTIONS
  addPatient(): void {

    console.log('Add patient');

  }


  viewPatient(patient: Patient): void {

    console.log('View patient:', patient);

  }


  editPatient(patient: Patient): void {

    console.log('Edit patient:', patient);

  }


  deletePatient(patient: Patient): void {

    const confirmed = window.confirm(
      `Are you sure you want to remove ${patient.name}?`
    );

    if (!confirmed) {
      return;
    }

    this.patients = this.patients.filter(
      item => item.id !== patient.id
    );

  }

}