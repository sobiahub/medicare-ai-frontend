import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Department {
  id: number;
  name: string;
  description: string;
  doctors: number;
  patients: number;
  services: number;
  status: 'Active' | 'Inactive';
  icon: string;
}

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments {

  searchTerm = '';

  selectedStatus = 'All Status';


  // DEPARTMENTS
  departments: Department[] = [

    {
      id: 1,
      name: 'Cardiology',
      description:
        'Specialized care for heart conditions, cardiovascular health, and prevention.',
      doctors: 12,
      patients: 148,
      services: 8,
      status: 'Active',
      icon: 'bi-heart-pulse',
    },

    {
      id: 2,
      name: 'Dermatology',
      description:
        'Diagnosis and treatment of skin, hair, and nail related conditions.',
      doctors: 8,
      patients: 96,
      services: 6,
      status: 'Active',
      icon: 'bi-person-bounding-box',
    },

    {
      id: 3,
      name: 'Neurology',
      description:
        'Specialized neurological care for brain, spine, and nervous system disorders.',
      doctors: 7,
      patients: 74,
      services: 5,
      status: 'Active',
      icon: 'bi-diagram-3',
    },

    {
      id: 4,
      name: 'Pediatrics',
      description:
        'Comprehensive healthcare services focused on infants, children, and adolescents.',
      doctors: 10,
      patients: 126,
      services: 7,
      status: 'Active',
      icon: 'bi-balloon-heart',
    },

    {
      id: 5,
      name: 'Orthopedics',
      description:
        'Medical and surgical treatment for bones, joints, muscles, and movement.',
      doctors: 6,
      patients: 82,
      services: 5,
      status: 'Active',
      icon: 'bi-person-walking',
    },

    {
      id: 6,
      name: 'Ophthalmology',
      description:
        'Specialized diagnosis, treatment, and prevention of eye conditions.',
      doctors: 5,
      patients: 61,
      services: 4,
      status: 'Active',
      icon: 'bi-eye',
    },

    {
      id: 7,
      name: 'Dental',
      description:
        'Preventive, restorative, and general dental healthcare services.',
      doctors: 4,
      patients: 48,
      services: 4,
      status: 'Inactive',
      icon: 'bi-emoji-smile',
    },

    {
      id: 8,
      name: 'General Medicine',
      description:
        'Primary medical care, routine consultations, diagnosis, and prevention.',
      doctors: 14,
      patients: 184,
      services: 9,
      status: 'Active',
      icon: 'bi-hospital',
    },

  ];


  // FILTERED DEPARTMENTS
  get filteredDepartments(): Department[] {

    const search = this.searchTerm
      .trim()
      .toLowerCase();

    return this.departments.filter((department) => {

      const matchesSearch =
        !search ||
        department.name.toLowerCase().includes(search) ||
        department.description.toLowerCase().includes(search);


      const matchesStatus =
        this.selectedStatus === 'All Status' ||
        department.status === this.selectedStatus;


      return matchesSearch && matchesStatus;

    });

  }


  // SUMMARY
  get activeDepartments(): number {

    return this.departments.filter(
      department => department.status === 'Active'
    ).length;

  }


  get inactiveDepartments(): number {

    return this.departments.filter(
      department => department.status === 'Inactive'
    ).length;

  }


  get totalDoctors(): number {

    return this.departments.reduce(
      (total, department) => total + department.doctors,
      0
    );

  }


  get totalPatients(): number {

    return this.departments.reduce(
      (total, department) => total + department.patients,
      0
    );

  }


  get hasFilters(): boolean {

    return !!(
      this.searchTerm ||
      this.selectedStatus !== 'All Status'
    );

  }


  // FILTER ACTIONS
  clearFilters(): void {

    this.searchTerm = '';

    this.selectedStatus = 'All Status';

  }


  // ACTIONS
  addDepartment(): void {

    console.log('Add department');

  }


  viewDepartment(department: Department): void {

    console.log('View department:', department);

  }


  editDepartment(department: Department): void {

    console.log('Edit department:', department);

  }


  deleteDepartment(department: Department): void {

    const confirmed = window.confirm(
      `Delete ${department.name} department?`
    );

    if (!confirmed) {
      return;
    }

    this.departments = this.departments.filter(
      item => item.id !== department.id
    );

  }


  toggleStatus(department: Department): void {

    department.status =
      department.status === 'Active'
        ? 'Inactive'
        : 'Active';

  }

}