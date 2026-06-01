// MediConnect AI - Constants

export const APP_NAME = "MediConnect AI";
export const APP_DESCRIPTION = "Smart Hospital & Blood Bank Management Platform";
export const APP_TAGLINE = "Your Health, Our Priority – Powered by AI";

// Theme Colors
export const COLORS = {
  primary: "#0EA5E9",
  secondary: "#14B8A6",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#6366F1",
} as const;

// Departments
export const DEPARTMENTS = [
  { id: "cardiology", name: "Cardiology", icon: "Heart", color: "#EF4444" },
  { id: "neurology", name: "Neurology", icon: "Brain", color: "#8B5CF6" },
  { id: "orthopedics", name: "Orthopedics", icon: "Bone", color: "#F59E0B" },
  { id: "dermatology", name: "Dermatology", icon: "Sparkles", color: "#EC4899" },
  { id: "pediatrics", name: "Pediatrics", icon: "Baby", color: "#14B8A6" },
  { id: "general", name: "General Medicine", icon: "Stethoscope", color: "#0EA5E9" },
  { id: "ophthalmology", name: "Ophthalmology", icon: "Eye", color: "#6366F1" },
  { id: "dentistry", name: "Dentistry", icon: "Smile", color: "#22C55E" },
  { id: "ent", name: "ENT", icon: "Ear", color: "#F97316" },
  { id: "gynecology", name: "Gynecology", icon: "Users", color: "#D946EF" },
] as const;

// Service Categories
export const SERVICE_CATEGORIES = [
  { id: "opd", name: "OPD", description: "Outpatient Department" },
  { id: "ipd", name: "IPD", description: "Inpatient Department" },
  { id: "surgery", name: "Surgery", description: "Surgical Services" },
  { id: "diagnostics", name: "Diagnostics", description: "Lab & Imaging" },
  { id: "pharmacy", name: "Pharmacy", description: "Medicine Dispensary" },
  { id: "icu", name: "ICU", description: "Intensive Care Unit" },
  { id: "ambulance", name: "Ambulance", description: "Emergency Transport" },
] as const;

// Blood Groups
export const BLOOD_GROUPS = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
] as const;

// Appointment Status
export const APPOINTMENT_STATUS = {
  pending: { label: "Pending", color: "warning" },
  confirmed: { label: "Confirmed", color: "success" },
  completed: { label: "Completed", color: "info" },
  cancelled: { label: "Cancelled", color: "danger" },
  rescheduled: { label: "Rescheduled", color: "secondary" },
} as const;

// Risk Levels
export const RISK_LEVELS = {
  low: { label: "Low Risk", color: "#22C55E", bg: "bg-emerald-500/10" },
  moderate: { label: "Moderate Risk", color: "#F59E0B", bg: "bg-amber-500/10" },
  high: { label: "High Risk", color: "#EF4444", bg: "bg-red-500/10" },
} as const;

// Navigation Items
export const PATIENT_NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/hospitals", label: "Find Hospitals", icon: "Building2" },
  { href: "/doctors", label: "Doctors", icon: "UserRound" },
  { href: "/appointments", label: "Appointments", icon: "Calendar" },
  { href: "/blood-banks", label: "Blood Banks", icon: "Droplets" },
  { href: "/ai-scanner", label: "AI Scanner", icon: "ScanLine" },
  { href: "/reports", label: "Reports", icon: "FileText" },
] as const;

export const HOSPITAL_NAV_ITEMS = [
  { href: "/hospital-dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/manage-doctors", label: "Doctors", icon: "UserRound" },
  { href: "/manage-services", label: "Services", icon: "Layers" },
  { href: "/manage-appointments", label: "Appointments", icon: "Calendar" },
  { href: "/patient-records", label: "Patient Records", icon: "ClipboardList" },
  { href: "/billing", label: "Billing", icon: "CreditCard" },
] as const;

export const BLOOD_BANK_NAV_ITEMS = [
  { href: "/bb-dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/inventory", label: "Inventory", icon: "Package" },
  { href: "/orders", label: "Orders", icon: "ShoppingCart" },
  { href: "/bb-analytics", label: "Analytics", icon: "BarChart3" },
] as const;

export const ADMIN_NAV_ITEMS = [
  { href: "/admin-dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/user-management", label: "Users", icon: "Users" },
  { href: "/verification", label: "Verification", icon: "ShieldCheck" },
  { href: "/monitoring", label: "Monitoring", icon: "Activity" },
  { href: "/platform-analytics", label: "Analytics", icon: "BarChart3" },
] as const;

// Landing Page Stats
export const PLATFORM_STATS = [
  { value: "500+", label: "Hospitals", icon: "Building2" },
  { value: "2000+", label: "Doctors", icon: "UserRound" },
  { value: "50K+", label: "Patients Served", icon: "Users" },
  { value: "100+", label: "Blood Banks", icon: "Droplets" },
] as const;
