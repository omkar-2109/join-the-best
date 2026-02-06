import { Link } from "react-router-dom";
import { Briefcase, Bookmark, Clock, TrendingUp, ArrowRight, MapPin, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import { sampleJobs } from "@/data/sampleData";

const myApplications = [
  { id: "1", title: "Senior Software Engineer", company: "TechVision Global", status: "Interview", date: "2026-02-04" },
  { id: "2", title: "Data Scientist", company: "AI Dynamics", status: "Applied", date: "2026-02-05" },
  { id: "3", title: "UX/UI Designer", company: "DesignFlow Studio", status: "In Review", date: "2026-02-01" },
  { id: "4", title: "Financial Analyst", company: "GlobalFinance Corp", status: "Offer", date: "2026-01-28" },
];

const statusColors: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-700",
  "In Review": "bg-amber-100 text-amber-700",
  Interview: "bg-purple-100 text-purple-700",
  Offer: "bg-green-100 text-green-700",
};

const activities = [
  { text: "Your application for Senior Software Engineer was viewed", time: "2 hours ago" },
  { text: "Interview scheduled with TechVision Global", time: "1 day ago" },
  { text: "You applied to Data Scientist at AI Dynamics", time: "1 day ago" },
  { text: "GlobalFinance Corp sent you an offer!", time: "1 week ago" },
];

const SeekerDashboard = () => {
  return (
    <Layout>
      <section className="gradient-navy py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-2xl font-bold text-primary-foreground">My Dashboard</h1>
          <p className="text-sm text-primary-foreground/70">Track your applications and discover new opportunities.</p>
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
              <p className="mt-1 text-xs text-muted-foreground">Add your portfolio to reach 100%</p>
            </div>
            <Button variant="outline" size="sm">Complete Profile</Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Applications", value: "12", icon: Briefcase, color: "bg-primary/10 text-primary" },
            { label: "Saved Jobs", value: "8", icon: Bookmark, color: "bg-accent/10 text-accent-foreground" },
            { label: "Interviews", value: "3", icon: Clock, color: "bg-purple-100 text-purple-700" },
            { label: "Offers", value: "1", icon: TrendingUp, color: "bg-green-100 text-green-700" },
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

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Applications */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg">My Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary">
                  <div>
                    <div className="text-sm font-semibold text-foreground">{app.title}</div>
                    <div className="text-xs text-muted-foreground">{app.company}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[app.status] || ""}>{app.status}</Badge>
                    <span className="text-xs text-muted-foreground">{app.date}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm text-foreground">{a.text}</p>
                    <span className="text-xs text-muted-foreground">{a.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recommended Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-lg">Recommended for You</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary" asChild>
                <Link to="/jobs">View All <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sampleJobs.slice(0, 3).map((job) => (
                <Link key={job.id} to={`/jobs/${job.id}`} className="rounded-lg border border-border p-3 transition-colors hover:bg-secondary">
                  <div className="text-sm font-semibold text-foreground">{job.title}</div>
                  <div className="text-xs text-muted-foreground">{job.company}</div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {job.location}
                  </div>
                  <div className="mt-1 text-xs font-medium text-accent">{job.salary}</div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SeekerDashboard;
