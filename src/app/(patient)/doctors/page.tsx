import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, Star, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Find Doctors - MediConnect AI",
  description: "Search for the best doctors across India.",
};

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; spec?: string }>;
}) {
  const { q = "", spec = "" } = await searchParams;

  const doctors = await prisma.doctor.findMany({
    where: {
      ...(q ? { name: { contains: q } } : {}),
      ...(spec ? { specialization: { contains: spec } } : {}),
    },
    include: {
      hospital: { select: { name: true, city: true, state: true } },
      department: { select: { name: true } },
    },
    orderBy: { rating: "desc" },
    take: 30,
  });

  const specializations = await prisma.doctor.findMany({
    select: { specialization: true },
    distinct: ["specialization"],
  });

  return (
    <div className="min-h-screen bg-muted/30 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Find Doctors</h1>
            <p className="text-muted-foreground mt-2">Search {doctors.length} top-rated specialists across India.</p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-card p-4 rounded-xl border shadow-sm">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="q" defaultValue={q} placeholder="Search doctor name..." className="pl-9" />
            </div>
            <div>
              <select name="spec" defaultValue={spec} className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                <option value="">All Specializations</option>
                {specializations.map((s) => (
                  <option key={s.specialization} value={s.specialization}>{s.specialization}</option>
                ))}
              </select>
            </div>
            <Button type="submit" className="w-full gradient-primary text-white border-0">Search</Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-all hover:-translate-y-0.5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-teal-400 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    {doc.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg leading-tight">{doc.name}</h3>
                    <p className="text-sm text-sky-600 font-medium">{doc.specialization}</p>
                    <p className="text-xs text-muted-foreground">{doc.department.name}</p>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">{doc.hospital.name}</div>
                <div className="text-xs text-muted-foreground">{doc.hospital.city}, {doc.hospital.state}</div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{doc.rating}</span>
                    <span className="text-xs text-muted-foreground">({doc.totalReviews})</span>
                  </div>
                  <Badge variant="secondary">{doc.experienceYears} yrs exp</Badge>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-sky-600 font-bold">₹{doc.consultationFee} <span className="text-xs text-muted-foreground font-normal">/ consult</span></div>
                  <Button size="sm" className="gradient-primary text-white border-0">
                    <Link href={`/appointments/book?doctorId=${doc.id}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
