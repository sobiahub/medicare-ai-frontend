import {
  Component,
  computed,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  SERVICES,
  HealthcareService
} from '../../../../core/data/services.data';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';


@Component({
  selector: 'app-services',
  standalone: true,

  imports: [
    Navbar,
    Footer,
    CommonModule,
    RouterLink
  ],

  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {

  

  services: HealthcareService[] = SERVICES;



  searchTerm = signal('');


 

  selectedCategory =
    signal('All Services');


  

  selectedService =
    signal<HealthcareService | null>(null);


 

  categories = [
    'All Services',
    'General Care',
    'Specialist Care',
    'Diagnostics',
    'Women & Children',
    'Emergency Care'
  ];


  

  filteredServices = computed(() => {

    const search =
      this.searchTerm()
        .trim()
        .toLowerCase();

    const category =
      this.selectedCategory();

    return this.services.filter(service => {

      const matchesSearch =
        !search ||
        service.title
          .toLowerCase()
          .includes(search) ||

        service.category
          .toLowerCase()
          .includes(search) ||

        service.description
          .toLowerCase()
          .includes(search);

      const matchesCategory =
        category === 'All Services' ||
        service.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );

    });

  });


 

  updateSearch(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.searchTerm.set(input.value);

  }




  selectCategory(category: string): void {

    this.selectedCategory.set(category);

  }


  

  openService(
    service: HealthcareService
  ): void {

    this.selectedService.set(service);

    document.body.style.overflow =
      'hidden';

  }




  closeService(): void {

    this.selectedService.set(null);

    document.body.style.overflow =
      '';

  }




  clearFilters(): void {

    this.searchTerm.set('');

    this.selectedCategory.set(
      'All Services'
    );

  }

}