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

interface AdminNavItem {
  label: string;
  route: string;
  icon: string;
}

interface AdminNavSection {
  title: string;
  items: AdminNavItem[];
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar {

  @Input() isOpen = false;

  @Output() closed = new EventEmitter<void>();


  readonly navigation: AdminNavSection[] = [

    {
      title: 'Overview',
      items: [
        {
          label: 'Dashboard',
          route: '/admin/dashboard',
          icon: 'bi-grid-1x2',
        },
      ],
    },

    {
      title: 'Management',
      items: [
        {
          label: 'Doctors',
          route: '/admin/doctors',
          icon: 'bi-person-badge',
        },
        {
          label: 'Patients',
          route: '/admin/patients',
          icon: 'bi-people',
        },
        {
          label: 'Appointments',
          route: '/admin/appointments',
          icon: 'bi-calendar2-check',
        },
        {
          label: 'Departments',
          route: '/admin/departments',
          icon: 'bi-hospital',
        },
      ],
    },

    {
      title: 'System',
      items: [
        {
          label: 'Users',
          route: '/admin/users',
          icon: 'bi-people-fill',
        },
      ],
    },

    
    // {
    //   title: 'Account',
    //   items: [
    //     {
    //       label: 'Profile',
    //       route: '/admin/profile',
    //       icon: 'bi-person-circle',
    //     },
    //     {
    //     label: 'Settings',
    //     route: '/admin/settings',
    //     icon: 'bi-gear',
    //   },
    //   ],
    // },

    {
      title: 'Analytics',
      items: [
        {
          label: 'Reports',
          route: '/admin/reports',
          icon: 'bi-bar-chart-line',
        },
      ],
    },

  ];


  closeSidebar(): void {
    this.closed.emit();
  }
}