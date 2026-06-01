"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Building2,
  UserRound,
  Droplets,
  Heart,
  Brain,
  Search,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";

export default function LandingPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    if (user) {
      if (user.role === "patient") {
        router.push("/dashboard");
      } else if (user.role === "hospital") {
        router.push("/hospital-dashboard");
      } else if (user.role === "blood_bank") {
        router.push("/bb-dashboard");
      }
    }
    return () => clearTimeout(timer);
  }, [user, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center animate-spin">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <p className="text-muted-foreground animate-pulse text-sm font-medium">Loading MediConnect AI...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, show a redirection placeholder while the router redirect occurs
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center animate-pulse">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <p className="text-muted-foreground text-sm font-medium">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-40 pointer-events-none" />
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "4s" }} />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full flex-1 flex flex-col justify-center">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-600 dark:text-sky-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-sky-500/20"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Healthcare Ecosystem
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4"
          >
            Welcome to <span className="text-gradient-primary">MediConnect AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Choose a portal to register your account or sign in to access your dashboard.
          </motion.p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full mb-16">
          {/* Patient Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card hover-lift h-full border-0 overflow-hidden group relative flex flex-col justify-between p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-6 shadow-md shadow-sky-500/5">
                  <UserRound className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Patient Portal</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Book appointments, scan medical reports with AI, find nearby hospitals, and request emergency blood.
                </p>
                <ul className="space-y-2 mb-8 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    AI Report Scanner & Insights
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    7-Step Appointment Booking
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    Emergency Blood Request System
                  </li>
                </ul>
              </div>
              <div className="space-y-3 mt-auto">
                <Link href="/register/patient">
                  <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-lg shadow-sky-500/20 py-6 text-base">
                    Register as Patient
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full border-sky-200 dark:border-sky-900/50 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 py-6 text-base font-semibold">
                    Patient Sign In
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Hospital Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card hover-lift h-full border-0 overflow-hidden group relative flex flex-col justify-between p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-6 shadow-md shadow-teal-500/5">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Hospital Portal</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Register your facility to manage doctors, update bed availability, coordinate appointments, and publish medical services.
                </p>
                <ul className="space-y-2 mb-8 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Doctor & Department Management
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Real-time Bed Capacity Updates
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    Appointment & Service Controls
                  </li>
                </ul>
              </div>
              <div className="space-y-3 mt-auto">
                <Link href="/register/hospital">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-lg shadow-teal-600/20 py-6 text-base">
                    Register Hospital
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full border-teal-200 dark:border-teal-900/50 hover:bg-teal-500/10 hover:text-teal-600 dark:hover:text-teal-400 py-6 text-base font-semibold">
                    Hospital Sign In
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Blood Bank Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass-card hover-lift h-full border-0 overflow-hidden group relative flex flex-col justify-between p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center mb-6 shadow-md shadow-red-500/5">
                  <Droplets className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Blood Bank Portal</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Register blood banks to manage blood group inventories, respond to emergency requests, and coordinate blood drives.
                </p>
                <ul className="space-y-2 mb-8 text-sm">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Real-time Inventory Tracking
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Urgency-based Request Dispatcher
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Analytics & Drive Coordinators
                  </li>
                </ul>
              </div>
              <div className="space-y-3 mt-auto">
                <Link href="/register/blood-bank">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-600/20 py-6 text-base">
                    Register Blood Bank
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full border-red-200 dark:border-red-900/50 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 py-6 text-base font-semibold">
                    Blood Bank Sign In
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Public Access Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center max-w-2xl mx-auto border-t border-border/40 pt-10"
        >
          <p className="text-sm text-muted-foreground mb-4">Want to browse public resources first?</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/hospitals">
              <Button variant="ghost" className="text-sm hover:bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold gap-1">
                <Search className="w-4 h-4" /> Search Hospitals
              </Button>
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link href="/blood-banks">
              <Button variant="ghost" className="text-sm hover:bg-red-500/10 text-red-600 dark:text-red-400 font-semibold gap-1">
                <Droplets className="w-4 h-4" /> Find Blood Banks
              </Button>
            </Link>
            <span className="text-muted-foreground/30">•</span>
            <Link href="/ai-scanner">
              <Button variant="ghost" className="text-sm hover:bg-teal-500/10 text-teal-600 dark:text-teal-400 font-semibold gap-1">
                <Brain className="w-4 h-4" /> AI Report Scanner
              </Button>
            </Link>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}
