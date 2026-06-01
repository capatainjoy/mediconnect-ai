"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  const contacts = [
    { icon: Mail, label: "Email Us", value: "hello@mediconnect.ai", sub: "We reply within 24 hours" },
    { icon: Phone, label: "Call Us", value: "1800-123-4567", sub: "Mon–Sat, 9 AM–7 PM IST" },
    { icon: MapPin, label: "Office", value: "Mumbai, Maharashtra", sub: "Innovation Hub, BKC" },
    { icon: Clock, label: "Support", value: "24/7 Emergency Line", sub: "For urgent medical queries" },
  ];

  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="bg-gradient-to-br from-sky-600 to-teal-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-5xl font-bold">Get in Touch</h1>
          <p className="text-xl text-white/80">Have questions? We are here to help you 24/7.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contacts.map((c) => (
                <div key={c.label} className="bg-card border rounded-2xl p-5 space-y-2 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center"><c.icon className="w-5 h-5" /></div>
                  <div className="font-semibold text-sm text-muted-foreground">{c.label}</div>
                  <div className="font-bold">{c.value}</div>
                  <div className="text-xs text-muted-foreground">{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-8">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-2xl font-bold">Message Sent!</h3>
              <p className="text-muted-foreground">Thank you for reaching out. We will get back to you within 24 hours.</p>
              <Button onClick={() => setSubmitted(false)} variant="outline">Send Another</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5"><label className="text-sm font-medium">Name</label><Input placeholder="Your name" required /></div>
                <div className="space-y-1.5"><label className="text-sm font-medium">Email</label><Input type="email" placeholder="your@email.com" required /></div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Subject</label>
                <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                  {["General Inquiry","Hospital Partnership","Blood Bank Registration","Technical Support","Billing & Payments"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Message</label>
                <textarea required className="w-full border rounded-lg p-3 text-sm min-h-[120px] bg-background resize-none focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Describe your query..." />
              </div>
              <Button type="submit" className="w-full gradient-primary text-white border-0 shadow-lg h-11 font-semibold gap-2" disabled={loading}>
                {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
