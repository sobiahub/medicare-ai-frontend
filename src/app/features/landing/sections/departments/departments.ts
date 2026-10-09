import {
  Component,
  computed,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  DEPARTMENTS,
  Department
} from '../../../../core/data/departments.data';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-departments',
  standalone: true,

  imports: [
    Navbar,
    Footer,
    CommonModule,
    RouterLink
  ],

  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments {


  departments: Department[] = DEPARTMENTS;



  searchTerm = signal<string>('');


  

  showAvailableOnly = signal<boolean>(false);



  filteredDepartments = computed(() => {

    const search =
      this.searchTerm()
        .trim()
        .toLowerCase();

    const availableOnly =
      this.showAvailableOnly();


    return this.departments.filter(
      department => {

      

        if (
          availableOnly &&
          !department.available
        ) {
          return false;
        }


        // Search

        if (!search) {
          return true;
        }


        const matchesName =
          department.name
            .toLowerCase()
            .includes(search);


        const matchesDescription =
          department.description
            .toLowerCase()
            .includes(search);


        const matchesService =
          department.services.some(
            service =>
              service
                .toLowerCase()
                .includes(search)
          );


        return (
          matchesName ||
          matchesDescription ||
          matchesService
        );

      }
    );

  });




  totalDepartments = computed(() => {

    return this.departments.length;

  });




  totalDoctors = computed(() => {

    return this.departments.reduce(
      (total, department) =>
        total + department.doctors,
      0
    );

  });


 

  availableDepartments = computed(() => {

    return this.departments.filter(
      department => department.available
    ).length;

  });


  

  updateSearch(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.searchTerm.set(input.value);

  }


  

  toggleAvailability(): void {

    this.showAvailableOnly.update(
      value => !value
    );

  }


  

  resetFilters(): void {

    this.searchTerm.set('');

    this.showAvailableOnly.set(false);

  }




  clearSearch(): void {

    this.searchTerm.set('');

  }


 

  selectedDepartment =
    signal<Department | null>(null);


  openDepartment(
    department: Department
  ): void {

    this.selectedDepartment.set(
      department
    );

    document.body.style.overflow = 'hidden';

  }




  closeDepartment(): void {

    this.selectedDepartment.set(null);

    document.body.style.overflow = '';

  }

}