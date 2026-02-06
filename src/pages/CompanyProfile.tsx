import { Link } from "react-router-dom";
import { MapPin, Users, Calendar, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { sampleCompanies, sampleJobs } from "@/data/sampleData";

const CompanyProfile = () => {
  const company = sampleCompanies[0];
  const companyJobs = sampleJobs.filter((j) => j.company === company.name);

  return (
    <Layout>
      {/* Banner */}
      <section className="gradient-navy py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-foreground/10 text-xl font-bold text-primary-foreground">
              {company.logo}
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-primary-foreground">{company.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-primary-foreground/70">
                <span>{company.industry}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {company.location}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {company.size}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Founded {company.founded}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="font-display text-lg">About</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{company.about}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-lg">Open Positions ({company.openPositions})</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary" asChild>
                    <Link to="/jobs">View All <ArrowRight className="ml-1 h-3 w-3" /></Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {companyJobs.length > 0 ? companyJobs.map((job) => (
                  <Link key={job.id} to={`/jobs/${job.id}`} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-secondary">
                    <div>
                      <div className="font-sans text-sm font-semibold text-foreground">{job.title}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{job.location}</span> · <span>{job.type}</span> · <span>{job.salary}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                )) : (
                  <p className="text-sm text-muted-foreground">No open positions with exact company match in sample data.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Culture</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {company.culture.map((c) => (
                    <Badge key={c} variant="secondary" className="bg-primary/10 text-primary">{c}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Benefits & Perks</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {company.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyProfile;
