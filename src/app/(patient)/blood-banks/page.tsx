import { prisma } from "@/lib/prisma";
import { Droplets, MapPin, Search, Phone, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Find Blood Banks - MediConnect AI",
  description: "Search for blood banks with live inventory near you.",
};

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default async function BloodBanksPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; bg?: string }>;
}) {
  const { city = "", bg = "" } = await searchParams;

  const bloodBanks = await prisma.bloodBank.findMany({
    where: {
      ...(city ? { city: { contains: city } } : {}),
      ...(bg ? { inventory: { some: { bloodGroup: bg, unitsAvailable: { gt: 0 } } } } : {}),
    },
    include: { inventory: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-muted/30 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Find Blood Banks</h1>
            <p className="text-muted-foreground mt-2">Search {bloodBanks.length} verified blood banks with live inventory.</p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-card p-4 rounded-xl border shadow-sm">
            <div className="relative md:col-span-2">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="city" defaultValue={city} placeholder="City (e.g. Mumbai)" className="pl-9" />
            </div>
            <div>
              <select name="bg" defaultValue={bg} className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                <option value="">All Blood Groups</option>
                {BLOOD_GROUPS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <Button type="submit" className="w-full gradient-primary text-white border-0">Search</Button>
          </form>
        </div>

        {bloodBanks.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border">
            <Droplets className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-semibold">No blood banks found</h3>
            <p className="text-muted-foreground">Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bloodBanks.map((bb) => {
              const totalUnits = bb.inventory.reduce((a, c) => a + c.unitsAvailable, 0);
              return (
                <Card key={bb.id} className="hover:shadow-md transition-shadow overflow-hidden">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-bold">{bb.name}</h2>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />{bb.city}, {bb.state}
                        </div>
                      </div>
                      <Badge className="bg-red-50 text-red-700 border-red-200">
                        {totalUnits} units
                      </Badge>
                    </div>

                    {/* Blood Group Grid */}
                    <div className="grid grid-cols-4 gap-2">
                      {BLOOD_GROUPS.map((group) => {
                        const inv = bb.inventory.find((i) => i.bloodGroup === group);
                        const units = inv?.unitsAvailable ?? 0;
                        return (
                          <div key={group} className={`text-center p-2 rounded-lg border ${units === 0 ? "bg-muted/30 text-muted-foreground border-muted" : units < 5 ? "bg-red-50 border-red-200 text-red-700" : "bg-green-50 border-green-200 text-green-700"}`}>
                            <div className="font-bold text-sm flex items-center justify-center gap-0.5">
                              <Droplets className="w-3 h-3" />{group}
                            </div>
                            <div className="text-xs font-semibold mt-0.5">{units > 0 ? `${units}u` : "N/A"}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Low stock warning */}
                    {bb.inventory.some((i) => i.unitsAvailable > 0 && i.unitsAvailable < 3) && (
                      <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        Some blood groups are critically low. Donate today!
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 gradient-primary text-white border-0">Request Blood</Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Phone className="w-3 h-3" />{bb.phone}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
