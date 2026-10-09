export interface HealthcareService {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  longDescription: string;
  doctors: number;
  patients: string;
  available: boolean;
  features: string[];
}

export const SERVICES: HealthcareService[] = [

{
id: 1,
title: 'General Medical Care',
category: 'General Care',
image: 'assets/images/services/general-medical-care.jpg',


description:
  'Routine checkups, general consultations, and preventive healthcare.',

longDescription:
  'Our general medical care service provides accessible healthcare for routine consultations, health assessments, preventive care, and management of common medical conditions.',

doctors: 12,
patients: '2.5K+',
available: true,

features: [
  'Routine health checkups',
  'General consultations',
  'Preventive healthcare',
  'Common illness management'
]


},

{
id: 2,
title: 'Cardiac Care',
category: 'Specialist Care',
image: 'assets/images/services/cardiology.jpg',


description:
  'Specialized cardiovascular care from experienced cardiology professionals.',

longDescription:
  'Our cardiac care service provides professional consultations, heart health assessments, preventive care, and ongoing support to help patients manage their cardiovascular health.',

doctors: 8,
patients: '1.8K+',
available: true,

features: [
  'Cardiac consultation',
  'Heart health assessment',
  'Preventive cardiac care',
  'Ongoing patient monitoring'
]


},

{
id: 3,
title: 'Laboratory & Diagnostic Tests',
category: 'Diagnostics',
image: 'assets/images/services/diagnostics.jpg',


description:
  'Reliable laboratory testing and diagnostic support for informed medical decisions.',

longDescription:
  'Our laboratory and diagnostic services support accurate medical assessment through essential laboratory investigations, diagnostic testing, and accessible test information for patients and healthcare professionals.',

doctors: 5,
patients: '3K+',
available: true,

features: [
  'Laboratory testing',
  'Diagnostic investigations',
  'Medical test reports',
  'Digital test information'
]


},

{
id: 4,
title: 'Dermatology',
category: 'Specialist Care',
image: 'assets/images/services/dermatology.jpg',

description:
'Professional skin, hair, and nail care provided by qualified dermatology professionals.',

longDescription:
'Our dermatology service provides consultations and professional care for common skin, hair, and nail concerns. Patients can access dermatological assessments, personalized care recommendations, and follow-up consultations based on their healthcare needs.',

doctors: 7,
patients: '1.6K+',
available: true,

features: [
'Skin Consultation',
'Hair & Scalp Care',
'Skin Condition Assessment',
'Personalized Care Plans'
]
},

{
id: 5,
title: 'Radiology & Imaging',
category: 'Diagnostics',
image: 'assets/images/services/radiology-imaging.jpg',


description:
  'Medical imaging services that support diagnosis and treatment planning.',

longDescription:
  'Our radiology and imaging service supports healthcare professionals through medical imaging examinations and diagnostic information to help evaluate health conditions and guide appropriate treatment planning.',

doctors: 6,
patients: '2K+',
available: true,

features: [
  'X-ray imaging',
  'Ultrasound examinations',
  'Medical imaging reports',
  'Diagnostic support'
]


},

{
id: 6,
title: 'Pediatric Care',
category: 'Women & Children',
image: 'assets/images/services/pediatrics.jpg',


description:
  'Dedicated healthcare services focused on children and their growing healthcare needs.',

longDescription:
  'Our pediatric service provides children with access to qualified healthcare professionals for routine checkups, common illnesses, preventive care, and ongoing health support.',

doctors: 9,
patients: '2.1K+',
available: true,

features: [
  'Child health checkups',
  'Pediatric consultation',
  'Preventive healthcare',
  'Growth monitoring'
]


},

{
id: 7,
title: 'Physiotherapy & Rehabilitation',
category: 'Rehabilitation',
image: 'assets/images/services/physiotherapy.jpg',


description:
  'Professional rehabilitation support to improve mobility, physical function, and recovery.',

longDescription:
  'Our physiotherapy and rehabilitation service supports patients recovering from injuries, managing mobility difficulties, and improving physical function through individualized rehabilitation plans and professional guidance.',

doctors: 6,
patients: '1.4K+',
available: true,

features: [
  'Physiotherapy consultation',
  'Mobility assessment',
  'Rehabilitation exercises',
  'Recovery planning'
]


},

{
id: 8,
title: 'Emergency Care',
category: 'Emergency Care',
image: 'assets/images/services/emergency-care.jpg',


description:
  'Access urgent medical assessment and emergency support when immediate attention is required.',

longDescription:
  'Our emergency care service is designed to support patients requiring urgent medical assessment and treatment. Emergency cases are prioritized according to clinical urgency, with appropriate coordination among healthcare professionals.',

doctors: 15,
patients: '4K+',
available: true,

features: [
  'Urgent medical assessment',
  'Emergency consultation',
  'Immediate care coordination',
  'Specialist support'
]


}

];
