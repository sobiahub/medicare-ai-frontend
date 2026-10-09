import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  DOCTORS,
  Doctor
} from '../../../../core/data/doctors.data';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    Navbar,
    Footer,
    CommonModule,
    RouterLink
  ],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors {

  

  doctors: Doctor[] = DOCTORS;


 

  searchTerm = signal('');


  

  selectedSpecialty = signal('All Specialties');

  selectedAvailability = signal('All');


 

  selectedDoctor = signal<Doctor | null>(null);




  specialties = [
    'All Specialties',
    'Cardiology',
    'Neurology',
    'Dermatology',
    'Pediatrics',
    'Orthopedics',
    'Gynecology',
    'General Medicine'
  ];


  availabilityOptions = [
    'All',
    'Available Today',
    'Available Tomorrow'
  ];


  

  filteredDoctors = computed(() => {

    const search = this.searchTerm()
      .trim()
      .toLowerCase();

    const specialty = this.selectedSpecialty();

    const availability = this.selectedAvailability();

    return this.doctors.filter(doctor => {

      const matchesSearch =
        !search ||
        doctor.name.toLowerCase().includes(search) ||
        doctor.specialty.toLowerCase().includes(search) ||
        doctor.department.toLowerCase().includes(search);

      const matchesSpecialty =
        specialty === 'All Specialties' ||
        doctor.specialty === specialty;

      const matchesAvailability =
        availability === 'All' ||
        doctor.availability === availability;

      return (
        matchesSearch &&
        matchesSpecialty &&
        matchesAvailability
      );

    });

  });




  updateSearch(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.searchTerm.set(input.value);

  }



  selectSpecialty(specialty: string): void {

    this.selectedSpecialty.set(specialty);

  }




  selectAvailability(availability: string): void {

    this.selectedAvailability.set(availability);

  }



  openDoctor(doctor: Doctor): void {

    this.selectedDoctor.set(doctor);

    document.body.style.overflow = 'hidden';

  }


  

  closeDoctor(): void {

    this.selectedDoctor.set(null);

    document.body.style.overflow = '';

  }




  clearFilters(): void {

    this.searchTerm.set('');

    this.selectedSpecialty.set(
      'All Specialties'
    );

    this.selectedAvailability.set('All');

  }


 

  availableDoctorsCount = computed(() => {

    return this.doctors.filter(
      doctor =>
        doctor.availability !== 'Unavailable'
    ).length;

  });

}