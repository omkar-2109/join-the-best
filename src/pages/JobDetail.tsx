import { useParams, Link } from "react-router-dom";
import { MapPin, Briefcase, Clock, DollarSign, Building, ArrowLeft, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { sampleJobs } from "@/data/sampleData";

const JobDetail = () => {
  const { id } = useParams();
  const job = sampleJobs.find((j) => j.id === id) || sampleJobs[0];

  const relatedJobs = sampleJobs.filter((j) => j.id !== job.id).slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back */}
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/jobs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs</Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 font-sans text-lg font-bold text-primary">
                      {job.companyLogo}
                    </div>
                    <div>
                      <h1 className="font-display text-2xl font-bold text-foreground">{job.title}</h1>
                      <p className="text-muted-foreground">{job.company}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="secondary"><MapPin className="mr-1 h-3 w-3" /> {job.location}</Badge>
                        <Badge variant="secondary"><Briefcase className="mr-1 h-3 w-3" /> {job.type}</Badge>
                        <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" /> {job.experience}</Badge>
                        <Badge variant="secondary"><DollarSign className="mr-1 h-3 w-3" /> {job.salary}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="hidden gap-2 md:flex">
                    <Button variant="ghost" size="icon"><Bookmark className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Share2 className="h-4 w-4" /></Button>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <Button className="bg-accent text-accent-foreground hover:bg-gold-dark">Apply Now</Button>
                  <Button variant="outline">Save Job</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Job Description</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Requirements</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Responsibilities</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Benefits</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((b, i) => (
                    <Badge key={i} variant="secondary">{b}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Company Overview</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                    {job.companyLogo}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{job.company}</div>
                    <div className="text-xs text-muted-foreground">{job.industry}</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry</span>
                    <span className="font-medium text-foreground">{job.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium text-foreground">{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Posted</span>
                    <span className="font-medium text-foreground">{job.postedDate}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/companies"><Building className="mr-2 h-4 w-4" /> View Company</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Related Jobs</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {relatedJobs.map((rj) => (
                  <Link key={rj.id} to={`/jobs/${rj.id}`} className="block rounded-lg border border-border p-3 transition-colors hover:bg-secondary">
                    <div className="font-sans text-sm font-semibold text-foreground">{rj.title}</div>
                    <div className="text-xs text-muted-foreground">{rj.company} · {rj.location}</div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetail;
