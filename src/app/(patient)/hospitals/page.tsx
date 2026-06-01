import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MapPin, Star, Building2, Phone, Mail, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HospitalSearchForm from "./HospitalSearchForm";

export const metadata = {
  title: "Find Hospitals - MediConnect AI",
  description: "Search for the best hospitals near you.",
};

// Haversine formula to calculate distance in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; 
}

export default async function HospitalsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const city = typeof resolvedParams.city === "string" ? resolvedParams.city : "";
  const state = typeof resolvedParams.state === "string" ? resolvedParams.state : "";
  const latParam = typeof resolvedParams.lat === "string" ? parseFloat(resolvedParams.lat) : null;
  const lngParam = typeof resolvedParams.lng === "string" ? parseFloat(resolvedParams.lng) : null;

  // Fetch all hospitals matching text filters
  let hospitals = await prisma.hospital.findMany({
    where: {
      name: { contains: q },
      ...(city ? { city: { contains: city } } : {}),
      ...(state ? { state } : {}),
    },
    include: {
      departments: true,
      services: true,
    },
    orderBy: {
      rating: "desc",
    },
  });

  // If GPS coords provided, calculate distance and sort
  if (latParam !== null && !isNaN(latParam) && lngParam !== null && !isNaN(lngParam)) {
    hospitals = hospitals.map(h => {
      const dist = (h.lat && h.lng) ? calculateDistance(latParam, lngParam, h.lat, h.lng) : 9999;
      return { ...h, distanceKm: dist };
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  }

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="mb-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Find Hospitals</h1>
            <p className="text-muted-foreground mt-2">
              Search {hospitals.length} top-rated hospitals and medical centers across India.
            </p>
          </div>

          <HospitalSearchForm />
        </div>

        {/* Results */}
        {hospitals.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-semibold">No hospitals found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or removing the state filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {hospitals.map((hospital) => (
              <Card key={hospital.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Left Column (Info) */}
                    <div className="p-6 md:w-2/3 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/hospitals/${hospital.id}`} className="hover:underline">
                            <h2 className="text-xl font-bold text-sky-600">{hospital.name}</h2>
                          </Link>
                          <div className="flex items-center text-sm text-muted-foreground mt-1 gap-1">
                            <MapPin className="h-3 w-3" />
                            {hospital.address}, {hospital.city}, {hospital.state}
                          </div>
                          {/* Display Distance if calculated */}
                          {('distanceKm' in hospital) && hospital.distanceKm !== 9999 && (
                            <div className="flex items-center text-sm text-emerald-600 font-medium mt-1 gap-1">
                              <Navigation className="h-3 w-3" />
                              {((hospital as unknown) as { distanceKm: number }).distanceKm.toFixed(1)} km away
                            </div>
                          )}
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          {hospital.rating} ({hospital.totalReviews})
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {hospital.departments.slice(0, 4).map((dept) => (
                          <Badge key={dept.id} variant="secondary" className="bg-sky-50 text-sky-700">
                            {dept.name}
                          </Badge>
                        ))}
                        {hospital.departments.length > 4 && (
                          <Badge variant="secondary" className="bg-muted">
                            +{hospital.departments.length - 4} more
                          </Badge>
                        )}
                      </div>

                      <div className="text-sm text-muted-foreground flex gap-4">
                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {hospital.phone}</span>
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {hospital.email}</span>
                      </div>
                    </div>

                    {/* Right Column (Actions) */}
                    <div className="p-6 md:w-1/3 bg-muted/10 border-t md:border-t-0 md:border-l flex flex-col justify-center gap-3">
                      <div className="text-center mb-2">
                        <span className="text-sm font-semibold block">{hospital.bedCount}</span>
                        <span className="text-xs text-muted-foreground">Beds Available</span>
                      </div>
                      <Button className="w-full">
                        <Link href={`/hospitals/${hospital.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Link href="/appointments/book">Book Appointment</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
