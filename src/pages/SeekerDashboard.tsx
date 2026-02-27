import { Link, Navigate } from "react-router-dom";
import { Briefcase, Bookmark, Clock, TrendingUp, ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

type ApplicationStatus = "Applied" | "Profile Shortlisted" | "Submitted to Partner" | "Interview Scheduled" | "Offer" | "Rejected" | "On Hold";

const statusColors: Record<string, string> = {
  "Applied": "bg-blue-100 text-blue-700",
  "Profile Shortlisted": "bg-amber-100 text-amber-700",
  "Submitted to Partner": "bg-purple-100 text-purple-700",
  "Interview Scheduled": "bg-indigo-100 text-indigo-700",
  "Offer": "bg-green-100 text-green-700",
  "Rejected": "bg-red-100 text-red-700",
  "On Hold": "bg-gray-100 text-gray-700",
};

const SeekerDashboard = () => {
  const { user, loading: authLoading, candidateProfileId } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!candidateProfileId) { setLoading(false); return; }

    const fetchData = async () => {
      const [appsRes, jobsRes] = await Promise.all([
        supabase.from("applications").select("*").eq("candidate_id", candidateProfileId),
        supabase.from("jobs").select("*").eq("active", true).limit(3),
      ]);
      setApplications(appsRes.data || []);
      setRecommendedJobs(jobsRes.data || []);

      // Fetch job details for applications
      if (appsRes.data?.length) {
        const jobIds = [...new Set(appsRes.data.map((a: any) => a.job_id))];
        const { data: jobData } = await supabase.from("jobs").select("*").in("id", jobIds);
        setJobs(jobData || []);
      }
      setLoading(false);
    };
    fetchData();
  }, [candidateProfileId]);

  if (authLoading) return <Layout><div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading...</div></Layout>;
  if (!user) return <Navigate to="/login" />;
  if (!candidateProfileId && !loading) return <Navigate to="/complete-profile" />;

  const getJob = (jobId: string) => jobs.find((j: any) => j.id === jobId);

  const statusCounts = {
    total: applications.length,
    interviews: applications.filter((a: any) => a.status === "Interview Scheduled").length,
    offers: applications.filter((a: any) => a.status === "Offer").length,
  };

  return (
    <Layout>
      <section className="gradient-navy py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-2xl font-bold text-primary-foreground">My Dashboard</h1>
          <p className="text-sm text-primary-foreground/70">Track your applications and discover new roles.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Profile Completion</span>
                <span className="text-sm font-semibold text-accent">{candidateProfileId ? "100%" : "50%"}</span>
              </div>
              <Progress value={candidateProfileId ? 100 : 50} className="h-2" />
              <p className="mt-1 text-xs text-muted-foreground">{candidateProfileId ? "Your profile is complete" : "Complete your profile for better matching"}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Applications", value: String(statusCounts.total), icon: Briefcase, color: "bg-primary/10 text-primary" },
            { label: "Saved Roles", value: "0", icon: Bookmark, color: "bg-accent/10 text-accent-foreground" },
            { label: "Interviews", value: String(statusCounts.interviews), icon: Clock, color: "bg-purple-100 text-purple-700" },
            { label: "Offers", value: String(statusCounts.offers), icon: TrendingUp, color: "bg-green-100 text-green-700" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}><s.icon className="h-5 w-5" /></div>
                <div>
                  <div className="font-display text-xl font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle className="font-display text-lg">My Applications</CardTitle></CardHeader>
          <CardContent>
            {loading ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Loading...</p>
            ) : applications.length === 0 ? (
              <div className="py-8 text-center">
                <Briefcase className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">No applications yet.</p>
                <Button size="sm" className="mt-3" asChild><Link to="/jobs">Browse Roles</Link></Button>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((app: any) => {
                  const job = getJob(app.job_id);
                  return (
                    <div key={app.id} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary">
                      <div>
                        <div className="text-sm font-semibold text-foreground">{job?.title || "Unknown Role"}</div>
                        <div className="text-xs text-muted-foreground">{app.location_preference} · Applied {new Date(app.applied_at).toLocaleDateString()}</div>
                      </div>
                      <Badge className={statusColors[app.status] || ""}>{app.status}</Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-lg">Recommended Roles</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary" asChild>
                <Link to="/jobs">View All <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recommendedJobs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No roles available yet.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedJobs.map((job: any) => (
                  <Link key={job.id} to={`/jobs/${job.id}`} className="rounded-lg border border-border p-3 transition-colors hover:bg-secondary">
                    <div className="text-sm font-semibold text-foreground">{job.title}</div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {job.locations?.join(", ")}
                    </div>
                    <div className="mt-1 text-xs font-medium text-accent">{job.salary_range}</div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SeekerDashboard;
