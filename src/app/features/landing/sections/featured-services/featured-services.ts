import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  SERVICES,
  HealthcareService
} from '../../../../core/data/services.data';

import {
  DOCTORS,
  Doctor
} from '../../../../core/data/doctors.data';

import {
  DEPARTMENTS,
  Department
} from '../../../../core/data/departments.data';

@Component({
  selector: 'app-featured-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './featured-services.html',
  styleUrl: './featured-services.css'
})
export class FeaturedServices {



  services: HealthcareService[] = SERVICES;

  doctors: Doctor[] = DOCTORS;

  departments: Department[] = DEPARTMENTS;


  // FEATURED DATA
  featuredServices: HealthcareService[] =
    SERVICES.slice(0, 4);

  featuredDoctors: Doctor[] =
    DOCTORS.slice(0, 4);

  featuredDepartments: Department[] =
    DEPARTMENTS.slice(0, 4);

}