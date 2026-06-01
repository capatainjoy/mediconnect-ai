export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled" | "rescheduled";

export interface Appointment {
  id: string;
  appointment_id: string; // Human-readable ID (MC-XXXXX)
  patient_id: string;
  doctor_id: string;
  hospital_id: string;
  service_id?: string;
  department: string;
  date: string;
  time_slot: string;
  status: AppointmentStatus;
  qr_code?: string;
  notes?: string;
  created_at: string;
  // Joined fields
  doctor_name?: string;
  doctor_photo?: string;
  hospital_name?: string;
  service_name?: string;
}

export interface BookingState {
  step: number;
  hospital_id?: string;
  department_id?: string;
  service_id?: string;
  doctor_id?: string;
  date?: string;
  time_slot?: string;
}
