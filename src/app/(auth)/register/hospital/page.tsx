"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, User, Mail, Phone, Lock, Eye, EyeOff, Building2, ArrowLeft, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";

const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh"];

export default function HospitalRegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", adminName: "", email: "", phone: "", password: "",
    address: "", city: "", state: "", licenseNo: "", bedCount: "",
  });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.adminName || form.name,
          email: form.email,
          password: form.password,
          role: "hospital",
          hospitalName: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          licenseNo: form.licenseNo,
          bedCount: form.bedCount,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user);
        router.push("/hospital-dashboard");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch {
      alert("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4 pt-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-2xl shadow-xl w-full max-w-2xl p-8 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center"><Heart className="w-4 h-4 text-white" /></div>
            <span className="font-bold text-teal-600">MediConnect AI</span>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Register Your Hospital</h1>
          <p className="text-muted-foreground text-sm mt-1">Join the MediConnect network and start managing appointments, staff and beds digitally.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-medium">Hospital Name</label>
              <div className="relative"><Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="City Medical Center" value={form.name} onChange={(e) => update("name", e.target.value)} required /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Admin Name</label>
              <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="Dr. Rajesh Kumar" value={form.adminName} onChange={(e) => update("adminName", e.target.value)} required /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Phone</label>
              <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => update("phone", e.target.value)} required /></div>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" type="email" placeholder="admin@hospital.com" value={form.email} onChange={(e) => update("email", e.target.value)} required /></div>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-medium">Hospital Address</label>
              <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="123, Main Road, Sector 4" value={form.address} onChange={(e) => update("address", e.target.value)} required /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">City</label>
              <Input placeholder="Jamshedpur" value={form.city} onChange={(e) => update("city", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">State</label>
              <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm" value={form.state} onChange={(e) => update("state", e.target.value)} required>
                <option value="">Select State</option>
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">License / Reg. No.</label>
              <div className="relative"><FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="HOSP-JH-2025-001" value={form.licenseNo} onChange={(e) => update("licenseNo", e.target.value)} /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Total Beds</label>
              <Input type="number" placeholder="250" value={form.bedCount} onChange={(e) => update("bedCount", e.target.value)} />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9 pr-10" type={showPass ? "text" : "password"} placeholder="Min 8 characters" value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={8} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-lg h-11 font-semibold" disabled={loading}>
            {loading ? "Registering..." : "Register Hospital"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">By registering, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.</p>
        </form>
        <p className="text-center text-sm text-muted-foreground">Already registered? <Link href="/login" className="text-teal-600 font-medium hover:underline">Sign in</Link></p>
      </motion.div>
    </div>
  );
}
