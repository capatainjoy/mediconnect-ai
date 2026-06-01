export interface Hospital {
  id: string;
  name: string;
  license_no: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  website?: string;
  image?: string;
  description?: string;
  departments: string[];
  services: string[];
  rating: number;
  total_reviews: number;
  verified: boolean;
  emergency_available: boolean;
  bed_count: number;
  established_year: number;
  created_at: string;
}

export interface Department {
  id: string;
  hospital_id: string;
  name: string;
  description: string;
  icon: string;
  doctor_count: number;
}

export interface Service {
  id: string;
  hospital_id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration_minutes: number;
  availability: boolean;
}

export interface HospitalSearchFilters {
  country?: string;
  state?: string;
  city?: string;
  area?: string;
  name?: string;
  specialty?: string;
  maxDistance?: number;
  minRating?: number;
  services?: string[];
  emergencyOnly?: boolean;
  maxFee?: number;
  sortBy?: "distance" | "rating" | "name" | "fee";
}
