import Link from "next/link";
import { Heart, Award, Users, Globe, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us - MediConnect AI",
  description: "Learn about MediConnect AI — the platform revolutionizing healthcare in India.",
};

export default function AboutPage() {
  const stats = [
    { label: "Hospitals Connected", value: "500+" },
    { label: "Patients Served", value: "50,000+" },
    { label: "Cities Covered", value: "120+" },
    { label: "Doctors on Platform", value: "5,000+" },
  ];

  const team = [
    { name: "Dr. Rajiv Mehta", role: "Chief Medical Officer", initials: "RM" },
    { name: "Priya Sharma", role: "Chief Technology Officer", initials: "PS" },
    { name: "Ankit Gupta", role: "Head of Operations", initials: "AG" },
    { name: "Dr. Sunita Rao", role: "AI Research Lead", initials: "SR" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-sky-600 to-teal-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center"><Heart className="w-7 h-7" /></div>
          </div>
          <h1 className="text-5xl font-bold">About MediConnect AI</h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            We are building India&apos;s most comprehensive healthcare ecosystem — connecting patients, hospitals, doctors, and blood banks with the power of artificial intelligence.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-black text-sky-600">{s.value}</div>
              <div className="text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Healthcare in India is fragmented. Patients struggle to find the right doctors, hospitals operate with outdated systems, and blood banks manage inventory manually. MediConnect AI is here to change that.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe every Indian deserves seamless, affordable, and intelligent healthcare access — regardless of where they live. By combining AI, real-time data, and a connected network, we make quality healthcare accessible to all.
            </p>
            <Button className="gradient-primary text-white border-0 shadow-lg">
              <Link href="/hospitals">Find a Hospital Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Zap, title: "AI-Powered", desc: "Gemini AI analyzes medical reports instantly", color: "bg-sky-50 text-sky-600" },
              { icon: Globe, title: "Pan-India", desc: "120+ cities and growing every month", color: "bg-teal-50 text-teal-600" },
              { icon: Shield, title: "HIPAA Secure", desc: "Enterprise-grade data security for your records", color: "bg-indigo-50 text-indigo-600" },
              { icon: Users, title: "Community", desc: "50,000+ patients trust our platform daily", color: "bg-green-50 text-green-600" },
            ].map((f) => (
              <div key={f.title} className="bg-card border rounded-2xl p-6 space-y-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.color}`}><f.icon className="w-5 h-5" /></div>
                <h3 className="font-bold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-muted/30 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Meet the Team</h2>
          <p className="text-muted-foreground">Healthcare professionals and technologists united by a single mission.</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((m) => (
            <div key={m.name} className="text-center bg-card border rounded-2xl p-6 space-y-3">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white text-xl font-bold mx-auto">{m.initials}</div>
              <div>
                <div className="font-bold">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
