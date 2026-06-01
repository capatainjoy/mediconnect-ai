import { Check, Zap, Building2, Droplets, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Pricing - MediConnect AI",
  description: "Flexible pricing for patients, hospitals, and blood banks.",
};

const plans = [
  {
    name: "Patient",
    icon: Users,
    price: "Free",
    period: "forever",
    color: "bg-sky-50 text-sky-600 border-sky-200",
    cta: "Get Started Free",
    href: "/register/patient",
    features: [
      "Hospital & Doctor Search",
      "Online Appointment Booking",
      "AI Medical Report Scanner (3/month)",
      "Blood Bank Locator",
      "Appointment History",
      "Emergency SOS Button",
    ],
  },
  {
    name: "Hospital",
    icon: Building2,
    price: "₹4,999",
    period: "per month",
    color: "bg-teal-600 text-white border-teal-600",
    highlight: true,
    cta: "Start 14-Day Free Trial",
    href: "/register/hospital",
    features: [
      "All Patient Features",
      "Unlimited Doctor Profiles",
      "Appointment Management Dashboard",
      "Real-time Analytics & Revenue Reports",
      "Patient Record Management (HIPAA)",
      "Razorpay / Stripe Payment Integration",
      "Dedicated Account Manager",
      "24/7 Priority Support",
    ],
  },
  {
    name: "Blood Bank",
    icon: Droplets,
    price: "₹1,999",
    period: "per month",
    color: "bg-red-50 text-red-600 border-red-200",
    cta: "Register Blood Bank",
    href: "/register/blood-bank",
    features: [
      "Live Blood Inventory Management",
      "Request & Dispatch Management",
      "Hospital Network Connectivity",
      "Donation Camp Announcements",
      "Automated Low-Stock Alerts",
      "Analytics & Monthly Reports",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            For patients it&apos;s always free. For hospitals and blood banks, we offer plans that pay for themselves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-2xl border-2 p-8 space-y-6 bg-card ${p.highlight ? "border-teal-500 shadow-2xl shadow-teal-500/10 scale-105" : "border-border"}`}>
              {p.highlight && (
                <div className="text-center -mt-12 mb-2">
                  <span className="bg-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">MOST POPULAR</span>
                </div>
              )}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${p.color}`}>
                <p.icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{p.name}</h2>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-4xl font-black">{p.price}</span>
                  {p.period && <span className="text-muted-foreground text-sm mb-1">/ {p.period}</span>}
                </div>
              </div>
              <Button className={`w-full h-11 font-semibold ${p.highlight ? "gradient-primary text-white border-0 shadow-lg shadow-sky-500/25" : ""}`} variant={p.highlight ? "default" : "outline"}>
                <Link href={p.href}>{p.cta}</Link>
              </Button>
              <div className="space-y-3">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-card border rounded-2xl p-10 space-y-4">
          <Zap className="w-10 h-10 text-sky-500 mx-auto" />
          <h2 className="text-2xl font-bold">Enterprise Plans Available</h2>
          <p className="text-muted-foreground">Large hospital chains, multi-city blood bank networks? We offer custom pricing with dedicated SLAs.</p>
          <Button variant="outline" size="lg"><Link href="/contact">Talk to Sales</Link></Button>
        </div>
      </div>
    </div>
  );
}
