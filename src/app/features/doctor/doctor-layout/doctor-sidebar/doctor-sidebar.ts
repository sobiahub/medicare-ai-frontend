import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
} from '@angular/router';


interface DoctorNavItem {
  label: string;
  route: string;
  icon: string;
}

interface DoctorNavSection {
  title: string;
  items: DoctorNavItem[];
}


@Component({
  selector: 'app-doctor-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './doctor-sidebar.html',
  styleUrl: './doctor-sidebar.css',
})
export class DoctorSidebar {

  @Input() isOpen = false;

  @Output() closed = new EventEmitter<void>();


  readonly navigation: DoctorNavSection[] = [

    // OVERVIEW

    {
      title: 'Overview',
      items: [
        {
          label: 'Dashboard',
          route: '/doctor/dashboard',
          icon: 'bi-grid-1x2',
        },
      ],
    },


    // PATIENT CARE

    {
      title: 'Patient Care',
      items: [
        {
          label: 'Appointments',
          route: '/doctor/appointments',
          icon: 'bi-calendar2-check',
        },
        // {
        //   label: 'Patients',
        //   route: '/doctor/patients',
        //   icon: 'bi-people',
        // },
        {
          label: 'Schedule',
          route: '/doctor/schedule',
          icon: 'bi-calendar3',
        },
      ],
    },


    // ACCOUNT

    {
      title: 'Account',
      items: [
        {
          label: 'Profile',
          route: '/doctor/profile',
          icon: 'bi-person-circle',
        },
      
      ],
    },

  ];


  closeSidebar(): void {
    this.closed.emit();
  }

}