"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Home, Building2, Droplets, Brain, Shield, User, Globe, Menu, X, Sun, Moon, LogOut, LogIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/authStore";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { initAuth, user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      initAuth();
    }, 0);
    return () => clearTimeout(timer);
  }, [initAuth]);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/hospitals", label: t("find_hospitals"), icon: Building2 },
    { href: "/blood-banks", label: t("blood_banks"), icon: Droplets },
    { href: "/ai-scanner", label: t("ai_scanner"), icon: Brain },
    { href: "/life-insurance", label: t("life_insurance"), icon: Shield },
    { href: "/dashboard", label: t("dashboard"), icon: User },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      
      {/* Mobile Header (Top) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">MediConnect</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar (Left) */}
      <aside className={`fixed lg:static top-16 lg:top-0 left-0 h-[calc(100vh-4rem)] lg:h-screen w-64 bg-card border-r z-40 transform transition-transform duration-200 ease-in-out flex flex-col ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        
        {/* Brand */}
        <div className="hidden lg:flex items-center gap-3 p-6 border-b">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-sky-500/25">
            <Heart className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-bold text-xl block">MediConnect</span>
            <span className="text-[10px] uppercase font-bold text-sky-600 tracking-wider">AI Platform</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? "bg-sky-50 text-sky-700 font-semibold" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}>
                <link.icon className={`w-5 h-5 ${active ? "text-sky-600" : ""}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Language Selector */}
        <div className="p-4 border-t space-y-4">
          <div className="flex items-center gap-2 px-4 py-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as "en" | "hi" | "mr" | "ta" | "te" | "kn" | "bn" | "or")} 
              className="bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="or">ଓଡ଼ିଆ (Odia)</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 border-t pt-4">
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {mounted && theme === "dark" ? (
                <><Sun className="w-4 h-4" /> Light Mode</>
              ) : (
                <><Moon className="w-4 h-4" /> Dark Mode</>
              )}
            </button>
          </div>

          {/* User Profile & Auth */}
          <div className="border-t pt-4 px-4 pb-2">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/10 dark:hover:bg-red-900/20 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="w-full flex items-center justify-center gap-2 bg-sky-50 hover:bg-sky-100 text-sky-600 dark:bg-sky-900/10 dark:hover:bg-sky-900/20 py-2 rounded-lg text-sm font-medium transition-colors">
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto pt-16 lg:pt-0 relative w-full">
        {children}
      </main>

    </div>
  );
}
