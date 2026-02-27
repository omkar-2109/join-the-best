import { Link } from "react-router-dom";
import { Briefcase, Bookmark, Clock, TrendingUp, ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import { getApplications, getJobById, getActiveJobs, type ApplicationStatus } from "@/data/store";

const statusColors: Record<ApplicationStatus, string> = {
  "Applied": "bg-blue-100 text-blue-700",
  "Profile Shortlisted": "bg-amber-100 text-amber-700",
  "Submitted to Partner": "bg-purple-100 text-purple-700",
  "Interview Scheduled": "bg-indigo-100 text-indigo-700",
  "Offer": "bg-green-100 text-green-700",
  "Rejected": "bg-red-100 text-red-700",
  "On Hold": "bg-gray-100 text-gray-700",
};

const SeekerDashboard = () => {
  const applications = getApplications(); // In real app, filter by logged-in user
  const jobs = getActiveJobs().slice(0, 3);

  const statusCounts = {
    total: applications.length,
    interviews: applications.filter((a) => a.status === "Interview Scheduled").length,
    offers: applications.filter((a) => a.status === "Offer").length,
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
        {/* Profile Completion */}
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Profile Completion</span>
                <span className="text-sm font-semibold text-accent">75%</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="mt-1 text-xs text-muted-foreground">Complete your profile for better matching</p>
            </div>
            <Button variant="outline" size="sm">Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Applications", value: String(statusCounts.total), icon: Briefcase, color: "bg-primary/10 text-primary" },
            { label: "Saved Roles", value: "0", icon: Bookmark, color: "bg-accent/10 text-accent-foreground" },
            { label: "Interviews", value: String(statusCounts.interviews), icon: Clock, color: "bg-purple-100 text-purple-700" },
            { label: "Offers", value: String(statusCounts.offers), icon: TrendingUp, color: "bg-green-100 text-green-700" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-xl font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">My Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="py-8 text-center">
                <Briefcase className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">No applications yet.</p>
                <Button size="sm" className="mt-3" asChild>
                  <Link to="/jobs">Browse Roles</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((app) => {
                  const job = getJobById(app.jobId);
                  return (
                    <div key={app.id} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary">
                      <div>
                        <div className="text-sm font-semibold text-foreground">{job?.title || "Unknown Role"}</div>
                        <div className="text-xs text-muted-foreground">{app.locationPreference} · Applied {app.appliedAt}</div>
                      </div>
                      <Badge className={statusColors[app.status] || ""}>{app.status}</Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended */}
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
            {jobs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No roles available yet.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                  <Link key={job.id} to={`/jobs/${job.id}`} className="rounded-lg border border-border p-3 transition-colors hover:bg-secondary">
                    <div className="text-sm font-semibold text-foreground">{job.title}</div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {job.locations.join(", ")}
                    </div>
                    <div className="mt-1 text-xs font-medium text-accent">{job.salaryRange}</div>
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
