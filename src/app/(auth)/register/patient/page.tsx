"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, User, Mail, Phone, Lock, Eye, EyeOff, Droplets, CalendarDays, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";

export default function PatientRegisterPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", dob: "", bloodGroup: "", password: "" });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: form.name, 
          email: form.email, 
          password: form.password, 
          role: "patient",
          phone: form.phone,
          dob: form.dob,
          bloodGroup: form.bloodGroup,
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        login(data.user);
        router.push("/dashboard");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      alert("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center py-16 px-4 pt-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-2xl shadow-xl w-full max-w-lg p-8 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center"><Heart className="w-4 h-4 text-white" /></div>
            <span className="font-bold text-sky-600">MediConnect AI</span>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Create Patient Account</h1>
          <p className="text-muted-foreground text-sm mt-1">Join 50,000+ patients managing their health smarter.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2">
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="John Doe" value={form.name} onChange={(e) => update("name", e.target.value)} required /></div>
            </div>
            <div className="space-y-1.5 col-span-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} required /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Phone</label>
              <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Blood Group</label>
              <div className="relative"><Droplets className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 py-1 text-sm shadow-sm" value={form.bloodGroup} onChange={(e) => update("bloodGroup", e.target.value)}>
                  <option value="">Select</option>
                  {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-1.5 col-span-2">
              <label className="text-sm font-medium">Date of Birth</label>
              <div className="relative"><CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9" type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} /></div>
            </div>
            <div className="space-y-1.5 col-span-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input className="pl-9 pr-10" type={showPass ? "text" : "password"} placeholder="Min 8 characters" value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={8} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full gradient-primary text-white border-0 shadow-lg h-11 font-semibold" disabled={loading}>
            {loading ? "Creating account..." : "Create Patient Account"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">By creating an account, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.</p>
        </form>
        <p className="text-center text-sm text-muted-foreground">Already have an account? <Link href="/login" className="text-sky-500 font-medium hover:underline">Sign in</Link></p>
      </motion.div>
    </div>
  );
}
