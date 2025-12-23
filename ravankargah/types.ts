
export interface SyllabusModule {
  title: string;
  topics: string[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  specialties: string[];
  academicBackground?: string[];
  fullBio?: string;
  workshops?: string[];
}

export interface Course {
  id: string;
  title: string;
  instructorId: string;
  instructorName: string;
  category: string;
  durationHours: number;
  sessions?: number;
  image: string;
  hasCertificate: boolean;
  certificateProvider?: string;
  isOnline: boolean;
  mode: string;
  installmentsAvailable: boolean;
  installmentsCount?: number; // تعداد اقساط (مثلاً ۲، ۳، ۵)
  rating?: number;
  description?: string;
  syllabus?: (string | SyllabusModule)[];
  price?: number;
  schedule?: string[];
  paymentInfo?: {
    cardNumber: string;
    cardHolder: string;
  };
  installmentsInfo?: string;
  objectives?: string[];
  prerequisites?: string[];
}

export interface Category {
  id: string;
  title: string;
  count: number;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
}
