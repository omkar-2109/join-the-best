import { Briefcase, Users, Calendar, TrendingUp, Plus, Eye, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/layout/Layout";
import { sampleApplications } from "@/data/sampleData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const overviewCards = [
  { label: "Active Jobs", value: "24", icon: Briefcase, change: "+3 this week", color: "bg-primary/10 text-primary" },
  { label: "Total Applications", value: "1,284", icon: Users, change: "+127 this week", color: "bg-accent/10 text-accent-foreground" },
  { label: "Interviews", value: "38", icon: Calendar, change: "12 this week", color: "bg-green-100 text-green-700" },
  { label: "Hires Made", value: "156", icon: TrendingUp, change: "+8 this month", color: "bg-blue-100 text-blue-700" },
];

const pipelineStages = [
  { stage: "Applied", count: 542, percentage: 100 },
  { stage: "Screening", count: 328, percentage: 61 },
  { stage: "Interview", count: 156, percentage: 29 },
  { stage: "Offer", count: 48, percentage: 9 },
  { stage: "Hired", count: 32, percentage: 6 },
];

const chartData = [
  { month: "Sep", applications: 180 },
  { month: "Oct", applications: 220 },
  { month: "Nov", applications: 280 },
  { month: "Dec", applications: 250 },
  { month: "Jan", applications: 340 },
  { month: "Feb", applications: 310 },
];

const sourceData = [
  { name: "Direct", value: 40 },
  { name: "LinkedIn", value: 25 },
  { name: "Referral", value: 20 },
  { name: "Job Board", value: 15 },
];

const COLORS = ["hsl(220 60% 20%)", "hsl(42 87% 55%)", "hsl(152 60% 40%)", "hsl(210 80% 55%)"];

const RecruiterDashboard = () => {
  return (
    <Layout>
      <section className="gradient-navy py-8">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-foreground">Recruiter Dashboard</h1>
            <p className="text-sm text-primary-foreground/70">Welcome back! Here's your hiring overview.</p>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-gold-dark">
            <Plus className="mr-2 h-4 w-4" /> Post New Job
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Overview Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {overviewCards.map((card) => (
            <Card key={card.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">{card.value}</div>
                  <div className="text-xs text-muted-foreground">{card.label}</div>
                  <div className="text-xs text-green-600">{card.change}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pipeline */}
          <Card>
            <CardHeader><CardTitle className="font-display text-lg">Hiring Pipeline</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {pipelineStages.map((stage) => (
                <div key={stage.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{stage.stage}</span>
                    <span className="font-semibold text-foreground">{stage.count}</span>
                  </div>
                  <Progress value={stage.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chart */}
          <Card>
            <CardHeader><CardTitle className="font-display text-lg">Applications Over Time</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 20% 88%)" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="applications" fill="hsl(220 60% 20%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Applications */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display text-lg">Recent Applications</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary">View All <ArrowRight className="ml-1 h-3 w-3" /></Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleApplications.slice(0, 5).map((app) => (
                  <div key={app.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {app.candidateAvatar}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{app.candidateName}</div>
                        <div className="text-xs text-muted-foreground">{app.position}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        app.status === "Interview" ? "default" :
                        app.status === "Offer" ? "default" :
                        app.status === "Hired" ? "default" :
                        "secondary"
                      } className={
                        app.status === "Interview" ? "bg-blue-100 text-blue-700" :
                        app.status === "Offer" ? "bg-amber-100 text-amber-700" :
                        app.status === "Hired" ? "bg-green-100 text-green-700" :
                        app.status === "Rejected" ? "bg-red-100 text-red-700" :
                        ""
                      }>
                        {app.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{app.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Source Breakdown */}
          <Card>
            <CardHeader><CardTitle className="font-display text-lg">Source Breakdown</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                    {sourceData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default RecruiterDashboard;
