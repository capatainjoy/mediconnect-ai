"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Building2, Stethoscope, CalendarDays, Activity, Users, Settings,
  BedDouble, Plus, Trash2, Edit3, Check, X, ChevronRight, Star,
  Phone, Mail, MapPin, ClipboardList, LogOut, BarChart3, TrendingUp,
  Package, AlertCircle, CheckCircle, Clock, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

type Tab = "overview" | "appointments" | "beds" | "services" | "doctors" | "profile";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const MOCK_APPOINTMENTS = [
  { id: "1", patient: "Rahul Sharma", doctor: "Dr. S. Mehta", dept: "Cardiology", date: "2025-06-10", time: "10:00 AM", status: "confirmed" },
  { id: "2", patient: "Priya Patel", doctor: "Dr. A. Gupta", dept: "Neurology", date: "2025-06-10", time: "11:30 AM", status: "pending" },
  { id: "3", patient: "Ankit Verma", doctor: "Dr. R. Singh", dept: "Orthopedics", date: "2025-06-11", time: "09:00 AM", status: "completed" },
  { id: "4", patient: "Sunita Devi", doctor: "Dr. S. Mehta", dept: "Cardiology", date: "2025-06-12", time: "02:00 PM", status: "cancelled" },
  { id: "5", patient: "Mohan Das", doctor: "Dr. A. Gupta", dept: "Neurology", date: "2025-06-13", time: "03:30 PM", status: "pending" },
];

const MOCK_DOCTORS = [
  { id: "1", name: "Dr. Suresh Mehta", spec: "Cardiology", exp: 15, fee: 800, rating: 4.8, available: true },
  { id: "2", name: "Dr. Anita Gupta", spec: "Neurology", exp: 12, fee: 900, rating: 4.7, available: true },
  { id: "3", name: "Dr. Rajesh Singh", spec: "Orthopedics", exp: 10, fee: 700, rating: 4.6, available: false },
  { id: "4", name: "Dr. Kavitha Rao", spec: "Gynecology", exp: 8, fee: 750, rating: 4.9, available: true },
];

const MOCK_SERVICES = [
  { id: "1", name: "General OPD", category: "Consultation", price: 300, duration: 15, active: true },
  { id: "2", name: "ECG Test", category: "Diagnostics", price: 800, duration: 20, active: true },
  { id: "3", name: "MRI Scan", category: "Diagnostics", price: 5500, duration: 45, active: true },
  { id: "4", name: "Blood Test Panel", category: "Lab", price: 1200, duration: 10, active: true },
  { id: "5", name: "X-Ray", category: "Diagnostics", price: 600, duration: 10, active: false },
];

export default function HospitalDashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [services, setServices] = useState(MOCK_SERVICES);
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);
  const [beds, setBeds] = useState({ total: 350, available: 120, icu: 30, icuAvail: 8, emergency: 20, emergAvail: 12 });
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ name: "", category: "", price: "", duration: "" });

  useEffect(() => {
    if (!user) router.push("/login/hospital");
    else if (user.role !== "hospital") router.push("/dashboard");
  }, [user, router]);

  const handleLogout = async () => { await logout(); router.push("/login/hospital"); };

  const updateStatus = (id: string, status: string) => {
    setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
  };

  const addService = () => {
    if (!newService.name || !newService.price) return;
    setServices((prev) => [...prev, {
      id: String(Date.now()), name: newService.name, category: newService.category || "General",
      price: Number(newService.price), duration: Number(newService.duration) || 15, active: true
    }]);
    setNewService({ name: "", category: "", price: "", duration: "" });
    setShowAddService(false);
  };

  const removeService = (id: string) => setServices((prev) => prev.filter((s) => s.id !== id));
  const toggleDoctor = (id: string) => setDoctors((prev) => prev.map((d) => d.id === id ? { ...d, available: !d.available } : d));

  const stats = [
    { label: "Total Beds", value: beds.total, sub: `${beds.available} available`, icon: BedDouble, color: "bg-sky-100 text-sky-600" },
    { label: "ICU Beds", value: beds.icu, sub: `${beds.icuAvail} available`, icon: Activity, color: "bg-red-100 text-red-600" },
    { label: "Active Doctors", value: doctors.filter(d => d.available).length, sub: `of ${doctors.length} total`, icon: Stethoscope, color: "bg-teal-100 text-teal-600" },
    { label: "Today's Appointments", value: appointments.filter(a => a.status !== "cancelled").length, sub: `${appointments.filter(a => a.status === "pending").length} pending`, icon: CalendarDays, color: "bg-violet-100 text-violet-600" },
  ];

  const navTabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "appointments", label: "Appointments", icon: CalendarDays },
    { id: "beds", label: "Beds", icon: BedDouble },
    { id: "services", label: "Services", icon: Package },
    { id: "doctors", label: "Doctors", icon: Stethoscope },
    { id: "profile", label: "Profile", icon: Settings },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Header */}
      <div className="bg-card border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm leading-none">{user.name}</p>
              <p className="text-[11px] text-teal-600 font-semibold uppercase tracking-wide">Hospital Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-700 border-green-200">✓ Verified</Badge>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex gap-1 bg-muted/60 rounded-xl p-1 mb-6 overflow-x-auto">
          {navTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${tab === t.id ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

            {/* ─── OVERVIEW ─── */}
            {tab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((s) => (
                    <Card key={s.label} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-5 flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${s.color}`}><s.icon className="w-5 h-5" /></div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                          <p className="text-2xl font-bold">{s.value}</p>
                          <p className="text-xs text-muted-foreground">{s.sub}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center justify-between">
                        Recent Appointments
                        <button onClick={() => setTab("appointments")} className="text-xs text-sky-600 hover:underline flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {appointments.slice(0, 3).map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl border hover:bg-muted/40 transition-colors">
                          <div>
                            <p className="font-semibold text-sm">{apt.patient}</p>
                            <p className="text-xs text-muted-foreground">{apt.doctor} · {apt.dept}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-medium">{apt.date} · {apt.time}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[apt.status]}`}>{apt.status}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-3"><CardTitle className="text-base">Bed Summary</CardTitle></CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          { label: "General", total: beds.total, avail: beds.available, color: "bg-sky-500" },
                          { label: "ICU", total: beds.icu, avail: beds.icuAvail, color: "bg-red-500" },
                          { label: "Emergency", total: beds.emergency, avail: beds.emergAvail, color: "bg-amber-500" },
                        ].map((b) => (
                          <div key={b.label}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-medium">{b.label}</span>
                              <span className="text-muted-foreground">{b.avail}/{b.total} free</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className={`h-full ${b.color} rounded-full`} style={{ width: `${(b.avail / b.total) * 100}%` }} />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3"><CardTitle className="text-base">Quick Stats</CardTitle></CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Services offered</span><span className="font-semibold">{services.filter(s => s.active).length}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Departments</span><span className="font-semibold">6</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Avg Rating</span><span className="font-semibold flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />4.7</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Est. Revenue</span><span className="font-semibold text-green-600">₹2.4L</span></div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* ─── APPOINTMENTS ─── */}
            {tab === "appointments" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Appointment Management</h2>
                  <div className="flex gap-2">
                    {["all", "pending", "confirmed", "completed"].map((s) => (
                      <Badge key={s} variant="outline" className="cursor-pointer capitalize hover:bg-muted">{s}</Badge>
                    ))}
                  </div>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            {["Patient", "Doctor", "Department", "Date & Time", "Status", "Actions"].map((h) => (
                              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {appointments.map((apt) => (
                            <tr key={apt.id} className="hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-3 font-semibold">{apt.patient}</td>
                              <td className="px-4 py-3 text-muted-foreground">{apt.doctor}</td>
                              <td className="px-4 py-3 text-muted-foreground">{apt.dept}</td>
                              <td className="px-4 py-3 text-muted-foreground">{apt.date} · {apt.time}</td>
                              <td className="px-4 py-3">
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[apt.status]}`}>{apt.status}</span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-2">
                                  {apt.status === "pending" && (
                                    <>
                                      <button onClick={() => updateStatus(apt.id, "confirmed")} className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Confirm"><CheckCircle className="w-4 h-4" /></button>
                                      <button onClick={() => updateStatus(apt.id, "cancelled")} className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Cancel"><X className="w-4 h-4" /></button>
                                    </>
                                  )}
                                  {apt.status === "confirmed" && (
                                    <button onClick={() => updateStatus(apt.id, "completed")} className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Mark Complete"><Check className="w-4 h-4" /></button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ─── BEDS ─── */}
            {tab === "beds" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Bed Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "General Ward", totalKey: "total" as const, availKey: "available" as const, color: "sky", icon: BedDouble },
                    { label: "ICU", totalKey: "icu" as const, availKey: "icuAvail" as const, color: "red", icon: Activity },
                    { label: "Emergency", totalKey: "emergency" as const, availKey: "emergAvail" as const, color: "amber", icon: AlertCircle },
                  ].map((b) => (
                    <Card key={b.label} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <b.icon className={`w-4 h-4 text-${b.color}-600`} />
                          {b.label}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className={`text-center py-4 rounded-xl bg-${b.color}-50 dark:bg-${b.color}-900/20`}>
                          <p className="text-4xl font-bold">{beds[b.availKey]}</p>
                          <p className="text-sm text-muted-foreground">of {beds[b.totalKey]} available</p>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full bg-${b.color}-500 rounded-full transition-all`} style={{ width: `${(beds[b.availKey] / beds[b.totalKey]) * 100}%` }} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-xs text-muted-foreground">Total</label>
                            <Input type="number" value={beds[b.totalKey]} onChange={(e) => setBeds((p) => ({ ...p, [b.totalKey]: Number(e.target.value) }))} className="h-8 text-sm mt-1" />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Available</label>
                            <Input type="number" value={beds[b.availKey]} onChange={(e) => setBeds((p) => ({ ...p, [b.availKey]: Number(e.target.value) }))} className="h-8 text-sm mt-1" />
                          </div>
                        </div>
                        <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700 text-white border-0">Update Beds</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card>
                  <CardHeader><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="w-4 h-4" />Occupancy Summary</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-muted/40 rounded-xl">
                        <p className="text-3xl font-bold">{beds.total + beds.icu + beds.emergency}</p>
                        <p className="text-xs text-muted-foreground mt-1">Total Hospital Beds</p>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                        <p className="text-3xl font-bold text-green-600">{beds.available + beds.icuAvail + beds.emergAvail}</p>
                        <p className="text-xs text-muted-foreground mt-1">Total Available</p>
                      </div>
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                        <p className="text-3xl font-bold text-red-600">{(beds.total + beds.icu + beds.emergency) - (beds.available + beds.icuAvail + beds.emergAvail)}</p>
                        <p className="text-xs text-muted-foreground mt-1">Total Occupied</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ─── SERVICES ─── */}
            {tab === "services" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Services Management</h2>
                  <Button onClick={() => setShowAddService(true)} className="gradient-primary text-white border-0 gap-2">
                    <Plus className="w-4 h-4" /> Add Service
                  </Button>
                </div>

                {showAddService && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="border-sky-200 dark:border-sky-800">
                      <CardContent className="p-5">
                        <h3 className="font-semibold mb-4">Add New Service</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <Input placeholder="Service Name" value={newService.name} onChange={(e) => setNewService((p) => ({ ...p, name: e.target.value }))} />
                          <Input placeholder="Category (OPD, Lab...)" value={newService.category} onChange={(e) => setNewService((p) => ({ ...p, category: e.target.value }))} />
                          <Input placeholder="Price (₹)" type="number" value={newService.price} onChange={(e) => setNewService((p) => ({ ...p, price: e.target.value }))} />
                          <Input placeholder="Duration (mins)" type="number" value={newService.duration} onChange={(e) => setNewService((p) => ({ ...p, duration: e.target.value }))} />
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" onClick={addService} className="bg-teal-600 hover:bg-teal-700 text-white border-0">Save Service</Button>
                          <Button size="sm" variant="outline" onClick={() => setShowAddService(false)}>Cancel</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <Card>
                  <CardContent className="p-0">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          {["Service", "Category", "Price", "Duration", "Status", "Actions"].map((h) => (
                            <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {services.map((s) => (
                          <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3 font-semibold">{s.name}</td>
                            <td className="px-4 py-3"><Badge variant="outline">{s.category}</Badge></td>
                            <td className="px-4 py-3 font-semibold text-green-600">₹{s.price.toLocaleString()}</td>
                            <td className="px-4 py-3 text-muted-foreground">{s.duration} min</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                                {s.active ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button onClick={() => setServices((p) => p.map((sv) => sv.id === s.id ? { ...sv, active: !sv.active } : sv))} className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Toggle">
                                  <RefreshCw className="w-4 h-4" />
                                </button>
                                <button onClick={() => removeService(s.id)} className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ─── DOCTORS ─── */}
            {tab === "doctors" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Doctor Management</h2>
                  <Button className="gradient-primary text-white border-0 gap-2"><Plus className="w-4 h-4" /> Add Doctor</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                              {doc.name.split(" ").slice(-1)[0][0]}
                            </div>
                            <div>
                              <p className="font-bold">{doc.name}</p>
                              <p className="text-sm text-teal-600 font-medium">{doc.spec}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{doc.exp} yrs experience · ₹{doc.fee}/visit</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-sm font-semibold">{doc.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${doc.available ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                            {doc.available ? "✓ Available Today" : "✗ Unavailable"}
                          </span>
                          <div className="flex gap-2">
                            <button onClick={() => toggleDoctor(doc.id)} className="text-xs px-3 py-1.5 rounded-lg border hover:bg-muted transition-colors font-medium">
                              {doc.available ? "Mark Unavailable" : "Mark Available"}
                            </button>
                            <button className="p-1.5 rounded-lg border hover:bg-muted transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ─── PROFILE ─── */}
            {tab === "profile" && (
              <div className="max-w-2xl space-y-6">
                <h2 className="text-xl font-bold">Hospital Profile</h2>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4 pb-4 border-b">
                      <div className="w-16 h-16 rounded-2xl bg-teal-600 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <Badge className="mt-1 bg-teal-100 text-teal-700">Hospital Account</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Hospital Name</label>
                        <div className="relative"><Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" defaultValue={user.name} /></div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Email</label>
                        <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" defaultValue={user.email} /></div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Phone</label>
                        <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" defaultValue="+91 98765 43210" /></div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Total Beds</label>
                        <Input defaultValue={beds.total} type="number" />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm font-medium">Address</label>
                        <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" defaultValue="Main Road, Bistupur, Jamshedpur, Jharkhand" /></div>
                      </div>
                    </div>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white border-0">Save Changes</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-red-600 flex items-center gap-2"><AlertCircle className="w-4 h-4" />Danger Zone</h3>
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
