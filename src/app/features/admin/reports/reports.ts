import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ReportItem {
  id: number;
  title: string;
  type: string;
  description: string;
  date: string;
  format: 'PDF' | 'CSV' | 'Excel';
  icon: string;
}

interface DepartmentReport {
  name: string;
  appointments: number;
  percentage: number;
}

interface DoctorReport {
  name: string;
  department: string;
  appointments: number;
  completed: number;
  rating: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {

  // FILTERS
  selectedPeriod = 'This Month';

  selectedReportType = 'All Reports';


  // OVERVIEW
  totalAppointments = 486;

  completedAppointments = 392;

  cancelledAppointments = 38;

  totalPatients = 284;

  newPatients = 46;

  totalDoctors = 32;

  activeDoctors = 28;


  // APPOINTMENT TREND
  appointmentTrend = [
    {
      day: 'Mon',
      total: 52,
      completed: 42,
    },
    {
      day: 'Tue',
      total: 68,
      completed: 55,
    },
    {
      day: 'Wed',
      total: 61,
      completed: 49,
    },
    {
      day: 'Thu',
      total: 74,
      completed: 61,
    },
    {
      day: 'Fri',
      total: 82,
      completed: 68,
    },
    {
      day: 'Sat',
      total: 57,
      completed: 45,
    },
    {
      day: 'Sun',
      total: 36,
      completed: 28,
    },
  ];


  // DEPARTMENTS
  departmentReports: DepartmentReport[] = [

    {
      name: 'Cardiology',
      appointments: 94,
      percentage: 82,
    },

    {
      name: 'Neurology',
      appointments: 76,
      percentage: 68,
    },

    {
      name: 'Orthopedics',
      appointments: 64,
      percentage: 57,
    },

    {
      name: 'Dermatology',
      appointments: 51,
      percentage: 46,
    },

    {
      name: 'Pediatrics',
      appointments: 43,
      percentage: 39,
    },

  ];


  // TOP DOCTORS
  doctorReports: DoctorReport[] = [

    {
      name: 'Dr. Sarah Ahmed',
      department: 'Cardiology',
      appointments: 68,
      completed: 61,
      rating: 4.9,
    },

    {
      name: 'Dr. Hassan Raza',
      department: 'Neurology',
      appointments: 59,
      completed: 53,
      rating: 4.8,
    },

    {
      name: 'Dr. Maryam Iqbal',
      department: 'Orthopedics',
      appointments: 54,
      completed: 48,
      rating: 4.8,
    },

    {
      name: 'Dr. Ali Hassan',
      department: 'Dermatology',
      appointments: 47,
      completed: 43,
      rating: 4.7,
    },

  ];


  // REPORTS
  reports: ReportItem[] = [

    {
      id: 1,
      title: 'Monthly Appointment Report',
      type: 'Appointments',
      description:
        'Complete appointment activity and status summary.',
      date: 'Aug 13, 2026',
      format: 'PDF',
      icon: 'bi-calendar2-check',
    },

    {
      id: 2,
      title: 'Patient Registration Report',
      type: 'Patients',
      description:
        'New patient registrations and patient activity.',
      date: 'Aug 12, 2026',
      format: 'Excel',
      icon: 'bi-people',
    },

    {
      id: 3,
      title: 'Doctor Performance Report',
      type: 'Doctors',
      description:
        'Doctor appointments, completion rate and ratings.',
      date: 'Aug 10, 2026',
      format: 'PDF',
      icon: 'bi-person-badge',
    },

    {
      id: 4,
      title: 'Department Activity Report',
      type: 'Departments',
      description:
        'Department-wise appointments and activity.',
      date: 'Aug 08, 2026',
      format: 'CSV',
      icon: 'bi-diagram-3',
    },

  ];


  // COMPUTED VALUES
  get completionRate(): number {

    if (!this.totalAppointments) {
      return 0;
    }

    return Math.round(
      (this.completedAppointments / this.totalAppointments) * 100
    );

  }


  get cancellationRate(): number {

    if (!this.totalAppointments) {
      return 0;
    }

    return Math.round(
      (this.cancelledAppointments / this.totalAppointments) * 100
    );

  }


  get maxAppointments(): number {

    return Math.max(
      ...this.appointmentTrend.map(item => item.total)
    );

  }


  get filteredReports(): ReportItem[] {

    if (this.selectedReportType === 'All Reports') {
      return this.reports;
    }

    return this.reports.filter(
      report => report.type === this.selectedReportType
    );

  }


  // ACTIONS
  generateReport(): void {

    console.log(
      'Generate report:',
      this.selectedPeriod,
      this.selectedReportType
    );

  }


  exportReport(format: string): void {

    console.log(
      `Exporting ${this.selectedPeriod} report as ${format}`
    );

  }


  viewReport(report: ReportItem): void {

    console.log('Viewing report:', report);

  }


  downloadReport(report: ReportItem): void {

    console.log('Downloading report:', report);

  }


  // BAR HEIGHT
  getBarHeight(value: number): string {

    if (!this.maxAppointments) {
      return '0%';
    }

    return `${Math.round(
      (value / this.maxAppointments) * 100
    )}%`;

  }

}