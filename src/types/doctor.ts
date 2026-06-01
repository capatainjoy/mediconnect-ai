export interface Doctor {
  id: string;
  hospital_id: string;
  department_id: string;
  name: string;
  photo?: string;
  qualification: string;
  specialization: string;
  experience_years: number;
  consultation_fee: number;
  rating: number;
  total_reviews: number;
  bio?: string;
  languages: string[];
  available_today: boolean;
}

export interface DoctorSchedule {
  id: string;
  doctor_id: string;
  day_of_week: number; // 0-6
  start_time: string;
  end_time: string;
  slot_duration: number; // minutes
  is_available: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
