import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Mail, Star, Clock, Shield, Bed, ChevronRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hospital = await prisma.hospital.findUnique({ where: { id } });
  return { title: hospital ? `${hospital.name} - MediConnect AI` : "Hospital Not Found" };
}

export default async function HospitalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hospital = await prisma.hospital.findUnique({
    where: { id },
    include: {
      departments: true,
      services: { orderBy: { price: "asc" } },
      doctors: { include: { department: true } },
    },
  });

  if (!hospital) notFound();

  return (
    <div className="min-h-screen bg-muted/30 pt-20 pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-sky-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/hospitals" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Hospitals
          </Link>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {hospital.verified && (
                  <Badge className="bg-white/20 text-white border-0 gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </Badge>
                )}
                {hospital.emergencyAvailable && (
                  <Badge className="bg-red-500/80 text-white border-0">24/7 Emergency</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{hospital.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{hospital.address}, {hospital.city}, {hospital.state}</span>
                <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" />{hospital.phone}</span>
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" />{hospital.email}</span>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-4 py-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold">{hospital.rating}</span>
                <span className="text-white/70 text-sm">({hospital.totalReviews} reviews)</span>
              </div>
              <Button size="lg" className="bg-white text-sky-700 hover:bg-white/90 font-bold shadow-lg">
                <Link href={`/appointments/book?hospitalId=${hospital.id}`}>Book Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Bed, label: "Total Beds", value: hospital.bedCount, color: "bg-sky-50 text-sky-600" },
              { icon: Star, label: "Rating", value: `${hospital.rating}/5`, color: "bg-yellow-50 text-yellow-600" },
              { icon: Clock, label: "Emergency", value: "24/7", color: "bg-red-50 text-red-600" },
              { icon: Shield, label: "Verified", value: "NABH", color: "bg-green-50 text-green-600" },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${s.color}`}><s.icon className="w-5 h-5" /></div>
                  <div>
                    <div className="font-bold text-lg leading-tight">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Departments */}
          <Card>
            <CardHeader><CardTitle>Departments ({hospital.departments.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {hospital.departments.map((dept) => (
                  <div key={dept.id} className="flex items-center gap-2.5 p-3 rounded-lg bg-muted/50 hover:bg-accent transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-sm">{dept.name[0]}</div>
                    <span className="font-medium text-sm">{dept.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Doctors */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Our Doctors ({hospital.doctors.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {hospital.doctors.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-white text-xl font-bold shrink-0">
                      {doc.name.split(" ").slice(-1)[0][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">{doc.specialization} • {doc.department.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.qualification} • {doc.experienceYears} yrs exp</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 justify-end mb-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{doc.rating}</span>
                      </div>
                      <div className="text-sm font-bold text-sky-600">₹{doc.consultationFee}</div>
                      <Button size="sm" className="mt-2 text-xs h-7">
                        <Link href={`/appointments/book?hospitalId=${hospital.id}&doctorId=${doc.id}`}>Book</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader><CardTitle>Services & Pricing</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hospital.services.map((svc) => (
                  <div key={svc.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <h4 className="font-medium">{svc.name}</h4>
                      <p className="text-xs text-muted-foreground">{svc.category} • {svc.durationMinutes} mins</p>
                    </div>
                    <div className="font-bold text-sky-600">₹{svc.price.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader><CardTitle className="text-lg">Book an Appointment</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Select a doctor and choose your preferred date and time.</p>
              <Button className="w-full gradient-primary text-white border-0">
                <Link href={`/appointments/book?hospitalId=${hospital.id}`}>
                  Book Now <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Free cancellation within 24 hrs
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Instant confirmation & QR code
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                No hidden charges
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Location</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{hospital.address}, {hospital.city}, {hospital.state} - {hospital.pincode || "India"}</p>
              <div className="mt-3 h-40 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 mr-2" /> Map View (Enable Google Maps API)
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
