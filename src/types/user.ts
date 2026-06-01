export type UserRole = "patient" | "hospital" | "blood_bank" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  name: string;
  status: "active" | "inactive" | "suspended";
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
