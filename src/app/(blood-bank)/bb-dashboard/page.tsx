"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Droplet, AlertTriangle, ArrowUpRight, ArrowDownRight, LayoutDashboard,
  Droplets, ClipboardList, Settings, Plus, Minus, Search, Calendar,
  Bell, Check, X, Shield, Activity, LogOut, HeartPulse, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";

type Tab = "overview" | "inventory" | "requests" | "drives" | "profile";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const MOCK_INVENTORY = [
  { id: "1", group: "A+", units: 45, status: "healthy" },
  { id: "2", group: "A-", units: 12, status: "low" },
  { id: "3", group: "B+", units: 68, status: "healthy" },
  { id: "4", group: "B-", units: 8, status: "critical" },
  { id: "5", group: "AB+", units: 24, status: "healthy" },
  { id: "6", group: "AB-", units: 3, status: "critical" },
  { id: "7", group: "O+", units: 85, status: "healthy" },
  { id: "8", group: "O-", units: 15, status: "low" },
];

const MOCK_REQUESTS = [
  { id: "R1", hospital: "Tata Main Hospital", patient: "Ramesh Kumar", group: "O-", units: 3, urgency: "critical", status: "pending", date: "2025-06-10" },
  { id: "R2", hospital: "City Care Clinic", patient: "Sita Devi", group: "B+", units: 2, urgency: "high", status: "approved", date: "2025-06-10" },
  { id: "R3", hospital: "Apollo Spectra", patient: "Amit Singh", group: "AB-", units: 1, urgency: "critical", status: "pending", date: "2025-06-11" },
  { id: "R4", hospital: "Direct Patient", patient: "Kavita Sharma", group: "A+", units: 2, urgency: "routine", status: "fulfilled", date: "2025-06-09" },
];

const MOCK_DRIVES = [
  { id: "D1", name: "Summer Mega Blood Drive", location: "JRD Tata Sports Complex", date: "2025-06-15", expectedDonors: 150, status: "upcoming" },
  { id: "D2", name: "Corporate Donation Camp", location: "Tech Park, Sector 5", date: "2025-06-20", expectedDonors: 80, status: "upcoming" },
  { id: "D3", name: "College Awareness Drive", location: "NIT Jamshedpur", date: "2025-05-25", expectedDonors: 200, status: "completed" },
];

export default function BloodBankDashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [drives, setDrives] = useState(MOCK_DRIVES);
  const [capacity, setCapacity] = useState(1000);

  useEffect(() => {
    if (!user) router.push("/login/blood-bank");
    else if (user.role !== "blood_bank") router.push("/dashboard");
  }, [user, router]);

  const handleLogout = async () => { await logout(); router.push("/login/blood-bank"); };

  const totalUnits = inventory.reduce((acc, curr) => acc + curr.units, 0);
  const criticalGroups = inventory.filter(i => i.status === "critical" || i.status === "low");

  const updateInventory = (group: string, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.group === group) {
        const newUnits = Math.max(0, item.units + delta);
        let newStatus = "healthy";
        if (newUnits < 10) newStatus = "critical";
        else if (newUnits < 20) newStatus = "low";
        return { ...item, units: newUnits, status: newStatus };
      }
      return item;
    }));
  };

  const updateRequestStatus = (id: string, status: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const navTabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory", icon: Droplets },
    { id: "requests", label: "Requests", icon: ClipboardList },
    { id: "drives", label: "Camps & Drives", icon: Calendar },
    { id: "profile", label: "Settings", icon: Settings },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center">
              <Droplet className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm leading-none">{user.name}</p>
              <p className="text-[11px] text-red-600 font-semibold uppercase tracking-wide">Blood Bank Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-700 border-green-200 gap-1.5"><Shield className="w-3 h-3" /> Certified</Badge>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation */}
        <div className="flex gap-1 bg-muted/60 rounded-xl p-1 mb-6 overflow-x-auto">
          {navTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${tab === t.id ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

            {/* ─── OVERVIEW ─── */}
            {tab === "overview" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Storage Capacity</span>
                    <Badge variant="outline" className="text-sm border-red-200 bg-red-50 text-red-700">{totalUnits} / {capacity} Units</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-red-600 to-rose-500 text-white border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between opacity-80 mb-4"><Droplet className="w-6 h-6" /><Activity className="w-6 h-6" /></div>
                      <p className="text-4xl font-bold">{totalUnits}</p>
                      <p className="text-sm font-medium opacity-90 mt-1">Total Blood Units</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4"><AlertTriangle className="w-5 h-5" /></div>
                      <p className="text-2xl font-bold">{criticalGroups.length}</p>
                      <p className="text-sm text-muted-foreground font-medium mt-1">Critical Blood Groups</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4"><ClipboardList className="w-5 h-5" /></div>
                      <p className="text-2xl font-bold">{requests.filter(r => r.status === "pending").length}</p>
                      <p className="text-sm text-muted-foreground font-medium mt-1">Pending Requests</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4"><HeartPulse className="w-5 h-5" /></div>
                      <p className="text-2xl font-bold">{drives.filter(d => d.status === "upcoming").length}</p>
                      <p className="text-sm text-muted-foreground font-medium mt-1">Upcoming Drives</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                      <CardTitle className="text-base">Recent Requests</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setTab("requests")} className="text-red-600 hover:text-red-700 h-8">View All</Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {requests.slice(0, 3).map(req => (
                        <div key={req.id} className="flex items-center justify-between p-3 rounded-xl border hover:bg-muted/40 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${req.urgency === 'critical' ? 'bg-red-100 text-red-700' : 'bg-muted'}`}>
                              {req.group}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{req.hospital}</p>
                              <p className="text-xs text-muted-foreground">{req.patient} · Needs {req.units} units</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={req.status === 'pending' ? 'outline' : 'secondary'} className={req.status === 'pending' ? 'border-amber-200 bg-amber-50 text-amber-700' : ''}>
                              {req.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3"><CardTitle className="text-base">Inventory Alerts</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      {criticalGroups.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground text-sm flex flex-col items-center gap-2">
                          <Check className="w-8 h-8 text-green-500" /> All groups are well-stocked.
                        </div>
                      ) : (
                        criticalGroups.map(group => (
                          <div key={group.group} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className={`w-4 h-4 ${group.status === 'critical' ? 'text-red-500' : 'text-orange-500'}`} />
                              <span className="font-semibold">{group.group}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold">{group.units} units</span>
                              <Badge variant="outline" className={`text-xs ${group.status === 'critical' ? 'border-red-200 text-red-700 bg-red-50' : 'border-orange-200 text-orange-700 bg-orange-50'}`}>
                                {group.status}
                              </Badge>
                            </div>
                          </div>
                        ))
                      )}
                      {criticalGroups.length > 0 && (
                        <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white" onClick={() => setTab("drives")}>Organize Camp</Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* ─── INVENTORY ─── */}
            {tab === "inventory" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Blood Inventory</h2>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search blood group..." className="pl-9 bg-card" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {inventory.map(item => (
                    <Card key={item.group} className={`relative overflow-hidden ${item.status === 'critical' ? 'border-red-300 shadow-sm shadow-red-100 dark:shadow-none' : ''}`}>
                      <div className={`absolute top-0 left-0 w-1 h-full ${item.status === 'critical' ? 'bg-red-500' : item.status === 'low' ? 'bg-orange-500' : 'bg-green-500'}`} />
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black ${item.status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-red-50 text-red-600'}`}>
                            {item.group}
                          </div>
                          <Badge variant="outline" className={item.status === 'critical' ? 'text-red-600 border-red-200 bg-red-50' : item.status === 'low' ? 'text-orange-600 border-orange-200 bg-orange-50' : 'text-green-600 border-green-200 bg-green-50'}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground font-medium">Available</p>
                            <p className="text-2xl font-bold">{item.units} <span className="text-sm font-normal text-muted-foreground">units</span></p>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => updateInventory(item.group, -1)} className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-muted"><Minus className="w-3 h-3" /></button>
                            <button onClick={() => updateInventory(item.group, 1)} className="w-8 h-8 rounded-lg border flex items-center justify-center bg-red-50 border-red-100 text-red-600 hover:bg-red-100"><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ─── REQUESTS ─── */}
            {tab === "requests" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Incoming Requests</h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            {["Date", "Hospital / Patient", "Blood Group", "Units", "Urgency", "Status", "Actions"].map((h) => (
                              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {requests.map(req => (
                            <tr key={req.id} className="hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-3 text-muted-foreground">{req.date}</td>
                              <td className="px-4 py-3">
                                <p className="font-semibold">{req.hospital}</p>
                                <p className="text-xs text-muted-foreground">{req.patient}</p>
                              </td>
                              <td className="px-4 py-3">
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{req.group}</Badge>
                              </td>
                              <td className="px-4 py-3 font-medium">{req.units}</td>
                              <td className="px-4 py-3">
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${req.urgency === 'critical' ? 'bg-red-100 text-red-700' : req.urgency === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                  {req.urgency}
                                </span>
                              </td>
                              <td className="px-4 py-3 capitalize font-medium text-muted-foreground">{req.status}</td>
                              <td className="px-4 py-3">
                                {req.status === "pending" && (
                                  <div className="flex gap-2">
                                    <Button size="sm" onClick={() => updateRequestStatus(req.id, "approved")} className="bg-green-600 hover:bg-green-700 h-7 text-xs">Approve</Button>
                                    <Button size="sm" variant="outline" onClick={() => updateRequestStatus(req.id, "rejected")} className="h-7 text-xs text-red-600 hover:bg-red-50">Reject</Button>
                                  </div>
                                )}
                                {req.status === "approved" && (
                                  <Button size="sm" onClick={() => updateRequestStatus(req.id, "fulfilled")} variant="outline" className="h-7 text-xs w-full bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">Mark Dispatched</Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ─── DRIVES ─── */}
            {tab === "drives" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Donation Drives & Camps</h2>
                  <Button className="bg-red-600 hover:bg-red-700 text-white border-0 gap-2"><Plus className="w-4 h-4" /> Schedule Drive</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drives.map(drive => (
                    <Card key={drive.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg">{drive.name}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1"><MapPin className="w-3.5 h-3.5" />{drive.location}</p>
                          </div>
                          <Badge variant={drive.status === 'upcoming' ? 'default' : 'secondary'} className={drive.status === 'upcoming' ? 'bg-red-600 hover:bg-red-700' : ''}>
                            {drive.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t text-sm">
                          <div className="flex items-center gap-1.5 font-medium"><Calendar className="w-4 h-4 text-muted-foreground" /> {drive.date}</div>
                          <div className="flex items-center gap-1.5 font-medium"><Droplets className="w-4 h-4 text-red-500" /> Target: {drive.expectedDonors} donors</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ─── PROFILE ─── */}
            {tab === "profile" && (
              <div className="max-w-2xl space-y-6">
                <h2 className="text-xl font-bold">Blood Bank Profile</h2>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4 pb-4 border-b">
                      <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center">
                        <Droplet className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <Badge className="mt-1 bg-red-100 text-red-700 border-red-200">Blood Bank Account</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Organization Name</label>
                        <Input defaultValue={user.name} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Contact Email</label>
                        <Input defaultValue={user.email} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Storage Capacity (Units)</label>
                        <Input type="number" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm font-medium">Address</label>
                        <Input defaultValue="Health Hub, Sector 3, City Center" />
                      </div>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white border-0 mt-4">Save Changes</Button>
                  </CardContent>
                </Card>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
