"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Building2, Stethoscope, CalendarDays, Clock, User, CreditCard, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const STEPS = [
  { id: 1, title: "Select Hospital", icon: Building2 },
  { id: 2, title: "Select Doctor", icon: Stethoscope },
  { id: 3, title: "Choose Date", icon: CalendarDays },
  { id: 4, title: "Choose Time", icon: Clock },
  { id: 5, title: "Your Details", icon: User },
  { id: 6, title: "Payment", icon: CreditCard },
  { id: 7, title: "Confirmed!", icon: QrCode },
];

const TIME_SLOTS = ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM"];

const MOCK_HOSPITALS = [
  { id: "h1", name: "Tata Main Hospital (TMH)", city: "Jamshedpur", state: "Jharkhand", rating: 4.8 },
  { id: "h2", name: "AIIMS New Delhi", city: "Delhi", state: "Delhi", rating: 4.9 },
  { id: "h3", name: "Apollo Hospitals", city: "Bhubaneswar", state: "Odisha", rating: 4.6 },
  { id: "h4", name: "Lilavati Hospital", city: "Mumbai", state: "Maharashtra", rating: 4.7 },
  { id: "h5", name: "Ruby Hall Clinic", city: "Pune", state: "Maharashtra", rating: 4.6 },
];

const MOCK_DOCTORS: Record<string, Array<{ id: string; name: string; specialization: string; fee: number; rating: number }>> = {
  h1: [
    { id: "d1", name: "Dr. A. Sharma", specialization: "Cardiologist", fee: 1000, rating: 4.8 },
    { id: "d2", name: "Dr. R. Verma", specialization: "Neurologist", fee: 1200, rating: 4.7 },
    { id: "d3", name: "Dr. S. Patil", specialization: "Orthopedic Surgeon", fee: 900, rating: 4.9 },
  ],
};

function BookingContent() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({
    hospital: null as typeof MOCK_HOSPITALS[0] | null,
    doctor: null as typeof MOCK_DOCTORS["h1"][0] | null,
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
    paymentMethod: "online",
  });
  const [bookingId, setBookingId] = useState("");

  const updateSelected = (key: string, value: unknown) => setSelected((p) => ({ ...p, [key]: value }));
  const next = () => setStep((s) => Math.min(s + 1, 7));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleConfirm = async () => {
    setBookingId(`MC-${Math.floor(100000 + Math.random() * 900000)}`);
    await new Promise((r) => setTimeout(r, 1500));
    next();
  };

  const today = new Date();
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  return (
    <div className="min-h-screen bg-muted/30 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Step Indicator */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center shrink-0">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${step === s.id ? "bg-sky-500 text-white" : step > s.id ? "bg-sky-100 text-sky-700" : "bg-muted text-muted-foreground"}`}>
                  {step > s.id ? <Check className="w-3 h-3" /> : <s.icon className="w-3 h-3" />}
                  <span className="hidden sm:inline">{s.title}</span>
                </div>
                {i < STEPS.length - 1 && <ChevronRight className="w-3 h-3 text-muted-foreground mx-0.5 shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            
            {/* Step 1: Select Hospital */}
            {step === 1 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Select a Hospital</h2>
                  {MOCK_HOSPITALS.map((h) => (
                    <div key={h.id} onClick={() => updateSelected("hospital", h)} className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${selected.hospital?.id === h.id ? "border-sky-500 bg-sky-50/50" : "border-border hover:border-sky-300"}`}>
                      <div>
                        <h3 className="font-semibold">{h.name}</h3>
                        <p className="text-sm text-muted-foreground">{h.city}, {h.state}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">⭐ {h.rating}</Badge>
                        {selected.hospital?.id === h.id && <Check className="w-5 h-5 text-sky-500" />}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Step 2: Select Doctor */}
            {step === 2 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Select a Doctor</h2>
                  {(MOCK_DOCTORS[selected.hospital?.id || "h1"] || MOCK_DOCTORS["h1"]).map((d) => (
                    <div key={d.id} onClick={() => updateSelected("doctor", d)} className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${selected.doctor?.id === d.id ? "border-sky-500 bg-sky-50/50" : "border-border hover:border-sky-300"}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-white text-lg font-bold">{d.name.split(" ").slice(-1)[0][0]}</div>
                        <div>
                          <h3 className="font-semibold">{d.name}</h3>
                          <p className="text-sm text-muted-foreground">{d.specialization} • ⭐ {d.rating}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sky-600">₹{d.fee}</div>
                        {selected.doctor?.id === d.id && <Check className="w-5 h-5 text-sky-500 ml-auto mt-1" />}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Step 3: Choose Date */}
            {step === 3 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Choose Appointment Date</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {availableDates.map((d) => {
                      const iso = d.toISOString().split("T")[0];
                      return (
                        <div key={iso} onClick={() => updateSelected("date", iso)} className={`text-center p-3 border-2 rounded-xl cursor-pointer transition-all ${selected.date === iso ? "border-sky-500 bg-sky-50" : "border-border hover:border-sky-300"}`}>
                          <div className="text-xs text-muted-foreground uppercase">{d.toLocaleString("default", { weekday: "short" })}</div>
                          <div className="text-2xl font-bold">{d.getDate()}</div>
                          <div className="text-xs text-muted-foreground">{d.toLocaleString("default", { month: "short" })}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Choose Time */}
            {step === 4 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Choose Time Slot</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {TIME_SLOTS.map((t) => (
                      <div key={t} onClick={() => updateSelected("time", t)} className={`text-center p-3 border-2 rounded-xl cursor-pointer transition-all text-sm font-medium ${selected.time === t ? "border-sky-500 bg-sky-50 text-sky-700" : "border-border hover:border-sky-300"}`}>{t}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Patient Details */}
            {step === 5 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Your Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input value={selected.name} onChange={(e) => updateSelected("name", e.target.value)} placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input value={selected.phone} onChange={(e) => updateSelected("phone", e.target.value)} placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input value={selected.email} onChange={(e) => updateSelected("email", e.target.value)} type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium">Symptoms / Notes (optional)</label>
                      <textarea value={selected.notes} onChange={(e) => updateSelected("notes", e.target.value)} className="w-full border rounded-lg p-3 text-sm min-h-[80px] bg-background resize-none focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Describe your symptoms..." />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 6: Payment */}
            {step === 6 && (
              <Card>
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-xl font-semibold">Payment & Confirmation</h2>
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Hospital</span><span className="font-medium">{selected.hospital?.name}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Doctor</span><span className="font-medium">{selected.doctor?.name}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Date & Time</span><span className="font-medium">{selected.date} • {selected.time}</span></div>
                    <div className="flex justify-between text-sm border-t pt-2 mt-2"><span className="font-bold">Consultation Fee</span><span className="font-bold text-sky-600">₹{selected.doctor?.fee}</span></div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Payment Method</p>
                    {["online", "counter"].map((m) => (
                      <div key={m} onClick={() => updateSelected("paymentMethod", m)} className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${selected.paymentMethod === m ? "border-sky-500 bg-sky-50" : "border-border"}`}>
                        <div className={`w-4 h-4 rounded-full border-2 ${selected.paymentMethod === m ? "border-sky-500 bg-sky-500" : "border-muted-foreground"}`} />
                        <span className="font-medium capitalize">{m === "online" ? "Online Payment (Razorpay / UPI)" : "Pay at Counter"}</span>
                      </div>
                    ))}
                  </div>
                  <Button onClick={handleConfirm} className="w-full gradient-primary text-white border-0 shadow-lg h-12 text-base font-bold">
                    Confirm Booking →
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 7: Confirmed */}
            {step === 7 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-green-700 mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-6">Your appointment has been successfully booked.</p>
                <div className="max-w-sm mx-auto bg-card rounded-2xl border shadow-lg p-6 space-y-3 mb-6">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-muted rounded-xl mx-auto mb-2 flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">Show this QR at the hospital reception</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold font-mono tracking-widest text-sky-600">{bookingId}</div>
                    <div className="text-xs text-muted-foreground">Appointment ID</div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Hospital</span><span className="font-medium">{selected.hospital?.name}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Doctor</span><span className="font-medium">{selected.doctor?.name}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{selected.date}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{selected.time}</span></div>
                  </div>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline"><Link href="/dashboard">Go to Dashboard</Link></Button>
                  <Button className="gradient-primary text-white border-0"><Link href="/hospitals">Book Another</Link></Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 7 && (
          <div className="flex items-center justify-between mt-6">
            <Button variant="outline" onClick={back} disabled={step === 1} className="gap-2">
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            {step < 6 && (
              <Button onClick={next} className="gap-2 gradient-primary text-white border-0" disabled={
                (step === 1 && !selected.hospital) ||
                (step === 2 && !selected.doctor) ||
                (step === 3 && !selected.date) ||
                (step === 4 && !selected.time) ||
                (step === 5 && (!selected.name || !selected.phone))
              }>
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
