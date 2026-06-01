export interface BloodBank {
  id: string;
  name: string;
  license_no: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  storage_capacity: number;
  verified: boolean;
  distance?: number;
  created_at: string;
}

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface BloodInventoryItem {
  id: string;
  blood_bank_id: string;
  blood_group: BloodGroup;
  units_available: number;
  expiry_date: string;
  last_updated: string;
}

export interface BloodRequest {
  id: string;
  patient_id: string;
  blood_bank_id: string;
  blood_group: BloodGroup;
  units_requested: number;
  urgency: "normal" | "urgent" | "critical";
  status: "pending" | "approved" | "dispatched" | "delivered" | "rejected";
  medical_doc_url?: string;
  notes?: string;
  created_at: string;
}

export type StockLevel = "available" | "low" | "critical";

export function getStockLevel(units: number): StockLevel {
  if (units >= 10) return "available";
  if (units >= 5) return "low";
  return "critical";
}
