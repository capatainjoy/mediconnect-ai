"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir"
];

export default function HospitalSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [state, setState] = useState(searchParams.get("state") || "");
  const [loadingLoc, setLoadingLoc] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (city) params.set("city", city);
    if (state) params.set("state", state);
    
    // Clear lat/lng if doing a manual text search
    router.push(`/hospitals?${params.toString()}`);
  };

  const handleDetectLocation = () => {
    setLoadingLoc(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const params = new URLSearchParams();
          if (q) params.set("q", q);
          params.set("lat", lat.toString());
          params.set("lng", lng.toString());
          // Optional: clear city/state since we have exact coords
          router.push(`/hospitals?${params.toString()}`);
          setLoadingLoc(false);
        },
        (error) => {
          console.error("Error detecting location", error);
          alert("Could not detect location. Please enable location permissions.");
          setLoadingLoc(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoadingLoc(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card p-4 rounded-xl border shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Name / Keyword Search */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search hospital name or specialty..." 
            className="pl-9 bg-muted/50 border-transparent focus-visible:bg-transparent"
          />
        </div>

        {/* City Search */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City (e.g. Mumbai)" 
            className="pl-9 bg-muted/50 border-transparent focus-visible:bg-transparent"
          />
        </div>

        {/* State Dropdown */}
        <div className="relative">
          <select 
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full h-10 rounded-md border-transparent bg-muted/50 px-3 py-2 text-sm focus-visible:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All States</option>
            {INDIAN_STATES.sort().map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={handleDetectLocation} disabled={loadingLoc} className="flex-1 md:flex-none">
          <Navigation className={`w-4 h-4 mr-2 ${loadingLoc ? "animate-spin" : ""}`} />
          {loadingLoc ? "Detecting..." : "Detect My Location"}
        </Button>
        <Button type="submit" className="flex-1">
          Search Hospitals
        </Button>
      </div>
    </form>
  );
}
