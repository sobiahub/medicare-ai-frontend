export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  department: string;
  qualification: string;
  image: string;

  rating: number;
  reviews: number;
  experience: number;

  availability:
    | 'Available Today'
    | 'Available Tomorrow'
    | 'Unavailable';

  nextAvailable: string;

  consultationFee: number;

  about: string;

  languages: string[];
}

export const DOCTORS: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Ayesha Khan',
    specialty: 'Cardiology',
    department: 'Cardiology Department',
    qualification: 'MBBS, FCPS (Cardiology)',
    image: 'assets/images/doctors/doctor-1.jpg',

    rating: 4.9,
    reviews: 128,
    experience: 12,

    availability: 'Available Today',
    nextAvailable: 'Today, 4:00 PM',

    consultationFee: 2500,

    about:
      'Dr. Ayesha Khan is an experienced cardiologist specializing in cardiovascular health, preventive cardiac care, and long-term patient management.',

    languages: [
      'English',
      'Urdu',
      'Punjabi'
    ]
  },

  {
    id: 2,
    name: 'Dr. Hamza Ahmed',
    specialty: 'Neurology',
    department: 'Neurology Department',
    qualification: 'MBBS, FCPS (Neurology)',
    image: 'assets/images/doctors/doctor-2.jpg',

    rating: 4.8,
    reviews: 96,
    experience: 10,

    availability: 'Available Tomorrow',
    nextAvailable: 'Tomorrow, 11:00 AM',

    consultationFee: 2800,

    about:
      'Dr. Hamza Ahmed provides neurological consultation and comprehensive care for patients with nervous system conditions.',

    languages: [
      'English',
      'Urdu'
    ]
  },

  {
    id: 3,
    name: 'Dr. Sara Malik',
    specialty: 'Dermatology',
    department: 'Dermatology Department',
    qualification: 'MBBS, MCPS, FCPS (Dermatology)',
    image: 'assets/images/doctors/doctor-3.jpg',

    rating: 4.9,
    reviews: 143,
    experience: 9,

    availability: 'Available Today',
    nextAvailable: 'Today, 5:30 PM',

    consultationFee: 2200,

    about:
      'Dr. Sara Malik specializes in skin, hair, and dermatological care with a focus on personalized treatment and long-term skin health.',

    languages: [
      'English',
      'Urdu',
      'Punjabi'
    ]
  },

  {
    id: 4,
    name: 'Dr. Bilal Raza',
    specialty: 'Pediatrics',
    department: 'Pediatrics Department',
    qualification: 'MBBS, FCPS (Pediatrics)',
    image: 'assets/images/doctors/doctor-4.jpg',

    rating: 4.8,
    reviews: 111,
    experience: 11,

    availability: 'Available Today',
    nextAvailable: 'Today, 6:00 PM',

    consultationFee: 2000,

    about:
      'Dr. Bilal Raza provides pediatric healthcare including routine checkups, preventive care, growth monitoring, and treatment of common childhood conditions.',

    languages: [
      'English',
      'Urdu'
    ]
  },

  {
    id: 5,
    name: 'Dr. Fatima Noor',
    specialty: 'Gynecology',
    department: 'Women Healthcare Department',
    qualification: 'MBBS, FCPS (Gynecology)',
    image: 'assets/images/doctors/doctor-5.jpg',

    rating: 4.9,
    reviews: 137,
    experience: 13,

    availability: 'Available Tomorrow',
    nextAvailable: 'Tomorrow, 2:00 PM',

    consultationFee: 2500,

    about:
      'Dr. Fatima Noor provides comprehensive women healthcare services including routine consultations, preventive care, and specialist support.',

    languages: [
      'English',
      'Urdu',
      'Punjabi'
    ]
  },

  {
    id: 6,
    name: 'Dr. Usman Ali',
    specialty: 'Orthopedics',
    department: 'Orthopedic Department',
    qualification: 'MBBS, FCPS (Orthopedics)',
    image: 'assets/images/doctors/doctor-6.jpg',

    rating: 4.7,
    reviews: 89,
    experience: 8,

    availability: 'Available Today',
    nextAvailable: 'Today, 3:30 PM',

    consultationFee: 2300,

    about:
      'Dr. Usman Ali specializes in orthopedic consultation, musculoskeletal assessment, mobility concerns, and recovery planning.',

    languages: [
      'English',
      'Urdu'
    ]
  },

  {
    id: 7,
    name: 'Dr. Ahmed Farooq',
    specialty: 'General Medicine',
    department: 'General Medicine Department',
    qualification: 'MBBS, FCPS (Medicine)',
    image: 'assets/images/doctors/doctor-7.jpg',

    rating: 4.8,
    reviews: 154,
    experience: 14,

    availability: 'Available Today',
    nextAvailable: 'Today, 2:30 PM',

    consultationFee: 1800,

    about:
      'Dr. Ahmed Farooq provides general medical care, preventive healthcare, routine checkups, and management of common medical conditions.',

    languages: [
      'English',
      'Urdu',
      'Punjabi'
    ]
  },

  {
    id: 8,
    name: 'Dr. Hina Aslam',
    specialty: 'Cardiology',
    department: 'Cardiology Department',
    qualification: 'MBBS, FCPS (Cardiology)',
    image: 'assets/images/doctors/doctor-8.jpg',

    rating: 4.9,
    reviews: 102,
    experience: 10,

    availability: 'Unavailable',
    nextAvailable: 'Friday, 10:00 AM',

    consultationFee: 2700,

    about:
      'Dr. Hina Aslam focuses on cardiovascular consultation, heart health assessment, preventive cardiac care, and patient monitoring.',

    languages: [
      'English',
      'Urdu'
    ]
  }
];