import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Briefcase, Users, CheckCircle, Clock, Send, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({ activeRoles: 0, totalApps: 0, pendingVerifications: 0, submitted: 0, interviews: 0, offers: 0 });
  const [candidates, setCandidates] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchData = async () => {
      const [jobsRes, candidatesRes, appsRes] = await Promise.all([
        supabase.from("jobs").select("id, active"),
        supabase.from("candidate_profiles").select("*").order("created_at", { ascending: false }).limit(10),
        supabase.from("applications").select("*").order("applied_at", { ascending: false }).limit(10),
      ]);
      const jobs = jobsRes.data || [];
      const apps = appsRes.data || [];
      const cands = candidatesRes.data || [];
      setCandidates(cands);
      setApplications(apps);
      setStats({
        activeRoles: jobs.filter((j: any) => j.active).length,
        totalApps: apps.length,
        pendingVerifications: cands.filter((c: any) => c.verification_status === "pending").length,
        submitted: apps.filter((a: any) => a.status === "Submitted to Partner").length,
        interviews: apps.filter((a: any) => a.status === "Interview Scheduled").length,
        offers: apps.filter((a: any) => a.status === "Offer").length,
      });
      setLoading(false);
    };
    fetchData();
  }, [isAdmin]);

  if (authLoading) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/login" />;

  const statCards = [
    { label: "Active Roles", value: stats.activeRoles, icon: Briefcase, color: "bg-primary/10 text-primary" },
    { label: "Total Applications", value: stats.totalApps, icon: Users, color: "bg-accent/10 text-accent-foreground" },
    { label: "Pending Verifications", value: stats.pendingVerifications, icon: Clock, color: "bg-amber-100 text-amber-700" },
    { label: "Submitted to Partners", value: stats.submitted, icon: Send, color: "bg-purple-100 text-purple-700" },
    { label: "Interviews", value: stats.interviews, icon: CheckCircle, color: "bg-blue-100 text-blue-700" },
    { label: "Placements", value: stats.offers, icon: Trophy, color: "bg-green-100 text-green-700" },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your recruitment pipeline</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map((s) => (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}><s.icon className="h-6 w-6" /></div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle className="font-display text-lg">Recent Candidates</CardTitle></CardHeader>
          <CardContent>
            {candidates.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No candidates registered yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-2 font-medium text-muted-foreground">Name</th>
                      <th className="pb-2 font-medium text-muted-foreground">Email</th>
                      <th className="pb-2 font-medium text-muted-foreground">Type</th>
                      <th className="pb-2 font-medium text-muted-foreground">Verification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((c: any, i: number) => (
                      <tr key={c.id} className={`border-b border-border ${i % 2 === 0 ? "bg-secondary/50" : ""}`}>
                        <td className="py-2.5 font-medium text-foreground">{c.name}</td>
                        <td className="py-2.5 text-muted-foreground">{c.email}</td>
                        <td className="py-2.5 capitalize text-muted-foreground">{c.experience_type}</td>
                        <td className="py-2.5">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            c.verification_status === "verified" ? "bg-green-100 text-green-700" : c.verification_status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                          }`}>{c.verification_status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
