export interface Department {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
  doctors: number;
  services: string[];
  available: boolean;
}

export const DEPARTMENTS: Department[] = [

{
id: 1,
name: 'General Medicine',
description:
'Primary healthcare for routine checkups, preventive care, common conditions, and general consultations.',


image: 'assets/images/departments/general-medicine.jpg',

icon: 'bi bi-heart-pulse-fill',

doctors: 12,

services: [
  'Routine Checkups',
  'General Consultation',
  'Preventive Healthcare',
  'Common Illness Management'
],

available: true


},

{
id: 2,
name: 'Cardiology',
description:
'Specialized cardiovascular care focused on heart health, prevention, assessment, and ongoing treatment.',


image: 'assets/images/departments/cardiology.jpg',

icon: 'bi bi-heart-pulse',

doctors: 8,

services: [
  'Cardiac Consultation',
  'Heart Health Assessment',
  'Preventive Cardiac Care',
  'Patient Monitoring'
],

available: true


},

{
id: 3,
name: 'Orthopedics',
description:
'Specialized care for bones, joints, muscles, mobility, and musculoskeletal concerns.',


image: 'assets/images/departments/orthopedics.jpg',

icon: 'bi bi-bandaid',

doctors: 6,

services: [
  'Orthopedic Consultation',
  'Musculoskeletal Assessment',
  'Mobility Support',
  'Recovery Planning'
],

available: true


},

{
id: 4,
name: 'Pediatrics',
description:
'Dedicated healthcare services supporting children through routine care, prevention, and treatment.',


image: 'assets/images/departments/pediatrics.jpg',

icon: 'bi bi-emoji-smile',

doctors: 9,

services: [
  'Child Checkups',
  'Pediatric Consultation',
  'Growth Monitoring',
  'Preventive Care'
],

available: true


},


{
id: 5,
name: 'Neurology',
description:
'Comprehensive neurological consultation and care for conditions affecting the brain, spinal cord, and nervous system.',


image: 'assets/images/departments/neurology.jpg',

icon: 'bi bi-activity',

doctors: 6,

services: [
  'Neurological Consultation',
  'Condition Assessment',
  'Treatment Planning',
  'Follow-up Care'
],

available: true


},

{
id: 6,
name: 'Dermatology',
description:
'Professional healthcare services for skin, hair, nails, and common dermatological concerns.',


image: 'assets/images/departments/dermatology.jpg',

icon: 'bi bi-person-hearts',

doctors: 7,

services: [
  'Skin Consultation',
  'Hair & Scalp Care',
  'Skin Assessment',
  'Personalized Care'
],

available: true


},

{
id: 7,
name: 'ENT (Ear, Nose & Throat)',
description:
'Specialized medical care for conditions affecting the ears, nose, throat, and related structures.',


image: 'assets/images/departments/ent.jpg',

icon: 'bi bi-ear',

doctors: 5,

services: [
  'Ear Examination',
  'Nose & Sinus Consultation',
  'Throat Assessment',
  'Hearing Health Evaluation'
],

available: true


}

];
