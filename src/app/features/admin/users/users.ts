import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Doctor' | 'Patient' | 'Staff';
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
  avatar: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  searchTerm = '';

  selectedRole = 'All Roles';

  selectedStatus = 'All Status';


  // USERS
  users: User[] = [

    {
      id: 1,
      name: 'Ahmed Khan',
      email: 'ahmed.khan@medicare.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: 'Today, 10:42 AM',
      avatar: 'AK',
    },

    {
      id: 2,
      name: 'Dr. Sarah Ahmed',
      email: 'sarah.ahmed@medicare.com',
      role: 'Doctor',
      status: 'Active',
      lastLogin: 'Today, 09:18 AM',
      avatar: 'SA',
    },

    {
      id: 3,
      name: 'Muhammad Ali',
      email: 'muhammad.ali@example.com',
      role: 'Patient',
      status: 'Active',
      lastLogin: 'Today, 08:45 AM',
      avatar: 'MA',
    },

    {
      id: 4,
      name: 'Dr. Hassan Raza',
      email: 'hassan.raza@medicare.com',
      role: 'Doctor',
      status: 'Active',
      lastLogin: 'Yesterday, 04:30 PM',
      avatar: 'HR',
    },

    {
      id: 5,
      name: 'Fatima Noor',
      email: 'fatima.noor@example.com',
      role: 'Patient',
      status: 'Active',
      lastLogin: 'Yesterday, 02:12 PM',
      avatar: 'FN',
    },

    {
      id: 6,
      name: 'Ayesha Malik',
      email: 'ayesha.malik@medicare.com',
      role: 'Staff',
      status: 'Active',
      lastLogin: 'Yesterday, 11:05 AM',
      avatar: 'AM',
    },

    {
      id: 7,
      name: 'Usman Tariq',
      email: 'usman.tariq@example.com',
      role: 'Patient',
      status: 'Inactive',
      lastLogin: 'Aug 08, 2026',
      avatar: 'UT',
    },

    {
      id: 8,
      name: 'Dr. Maryam Iqbal',
      email: 'maryam.iqbal@medicare.com',
      role: 'Doctor',
      status: 'Suspended',
      lastLogin: 'Aug 05, 2026',
      avatar: 'MI',
    },

    {
      id: 9,
      name: 'Bilal Ahmad',
      email: 'bilal.ahmad@medicare.com',
      role: 'Staff',
      status: 'Active',
      lastLogin: 'Aug 12, 2026',
      avatar: 'BA',
    },

    {
      id: 10,
      name: 'Hina Shah',
      email: 'hina.shah@example.com',
      role: 'Patient',
      status: 'Active',
      lastLogin: 'Aug 12, 2026',
      avatar: 'HS',
    },

  ];


  // FILTERED USERS
  get filteredUsers(): User[] {

    const search = this.searchTerm
      .trim()
      .toLowerCase();

    return this.users.filter((user) => {

      const matchesSearch =
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);


      const matchesRole =
        this.selectedRole === 'All Roles' ||
        user.role === this.selectedRole;


      const matchesStatus =
        this.selectedStatus === 'All Status' ||
        user.status === this.selectedStatus;


      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );

    });

  }


  // SUMMARY
  get activeUsers(): number {

    return this.users.filter(
      user => user.status === 'Active'
    ).length;

  }


  get inactiveUsers(): number {

    return this.users.filter(
      user => user.status === 'Inactive'
    ).length;

  }


  get suspendedUsers(): number {

    return this.users.filter(
      user => user.status === 'Suspended'
    ).length;

  }


  get adminCount(): number {

    return this.users.filter(
      user => user.role === 'Admin'
    ).length;

  }


  get doctorCount(): number {

    return this.users.filter(
      user => user.role === 'Doctor'
    ).length;

  }


  get patientCount(): number {

    return this.users.filter(
      user => user.role === 'Patient'
    ).length;

  }


  get staffCount(): number {

    return this.users.filter(
      user => user.role === 'Staff'
    ).length;

  }


  get hasFilters(): boolean {

    return !!(
      this.searchTerm ||
      this.selectedRole !== 'All Roles' ||
      this.selectedStatus !== 'All Status'
    );

  }


  // FILTER ACTIONS
  clearFilters(): void {

    this.searchTerm = '';

    this.selectedRole = 'All Roles';

    this.selectedStatus = 'All Status';

  }


  // USER ACTIONS
  addUser(): void {

    console.log('Add user');

  }


  viewUser(user: User): void {

    console.log('View user:', user);

  }


  editUser(user: User): void {

    console.log('Edit user:', user);

  }


  toggleStatus(user: User): void {

    if (user.status === 'Suspended') {
      user.status = 'Active';
      return;
    }

    user.status =
      user.status === 'Active'
        ? 'Inactive'
        : 'Active';

  }


  deleteUser(user: User): void {

    const confirmed = window.confirm(
      `Delete ${user.name} account?`
    );

    if (!confirmed) {
      return;
    }

    this.users = this.users.filter(
      item => item.id !== user.id
    );

  }


  // ROLE STYLING
  getRoleClasses(role: User['role']): string {

    switch (role) {

      case 'Admin':
        return 'bg-[#283779]/10 text-[#283779]';

      case 'Doctor':
        return 'bg-blue-50 text-blue-600';

      case 'Patient':
        return 'bg-emerald-50 text-emerald-600';

      case 'Staff':
        return 'bg-amber-50 text-amber-600';

      default:
        return 'bg-slate-100 text-slate-500';

    }

  }


  getRoleIcon(role: User['role']): string {

    switch (role) {

      case 'Admin':
        return 'bi-shield-check';

      case 'Doctor':
        return 'bi-person-badge';

      case 'Patient':
        return 'bi-person';

      case 'Staff':
        return 'bi-person-gear';

      default:
        return 'bi-person';

    }

  }

}