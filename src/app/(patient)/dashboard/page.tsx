import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Activity, Droplet } from "lucide-react";

export const metadata = {
  title: "Patient Dashboard - MediConnect AI",
};

export default async function PatientDashboard() {
  // In a real app, we would get the logged-in user's ID.
  // For this demo, we'll fetch the first patient in the DB.
  const user = await prisma.user.findFirst({
    where: { role: "patient" },
    include: {
      patientProfile: {
        include: {
          appointments: {
            include: { hospital: true, doctor: true },
            orderBy: { date: "asc" },
            take: 3,
          },
        },
      },
    },
  });

  if (!user || !user.patientProfile) {
    return <div>No patient data found. Please run the seeder.</div>;
  }

  const profile = user.patientProfile;

  return (
    <div className="min-h-screen bg-muted/30 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h1>
            <p className="text-muted-foreground mt-1">Here is your health overview for today.</p>
          </div>
          <Button>
            <Link href="/hospitals">Book New Appointment</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-sky-100 text-sky-600 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                <h3 className="text-2xl font-bold">{profile.appointments.length}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-teal-100 text-teal-600 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reports</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                <h3 className="text-2xl font-bold">Good</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                <Droplet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Blood Group</p>
                <h3 className="text-2xl font-bold">{profile.bloodGroup || "N/A"}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Upcoming Appointments</CardTitle>
                <Button variant="ghost" size="sm">
                  <Link href="/appointments">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {profile.appointments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No upcoming appointments.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profile.appointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                        <div className="flex items-center gap-4">
                          <div className="bg-sky-100 text-sky-700 font-bold p-3 rounded-lg text-center min-w-[70px]">
                            <div className="text-xs uppercase">{apt.date.toLocaleString('default', { month: 'short' })}</div>
                            <div className="text-xl">{apt.date.getDate()}</div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{apt.doctor.name}</h4>
                            <p className="text-sm text-muted-foreground">{apt.hospital.name} • {apt.department}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{apt.timeSlot}</div>
                          <div className="text-xs text-amber-600 font-medium capitalize mt-1">{apt.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <Card className="gradient-primary text-white border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">AI Report Scanner</h3>
                <p className="text-white/80 text-sm mb-4">
                  Upload your medical reports and get instant, easy-to-understand analysis using Gemini AI.
                </p>
                <Button variant="secondary" className="w-full text-sky-700 font-semibold shadow-lg">
                  Scan New Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Request Blood
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Update Medical History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
