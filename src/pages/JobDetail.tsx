import { useParams, Link } from "react-router-dom";
import { MapPin, Briefcase, Clock, DollarSign, ArrowLeft, Zap, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { getJobById, getActiveJobs } from "@/data/store";

const JobDetail = () => {
  const { id } = useParams();
  const job = id ? getJobById(id) : undefined;

  if (!job) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Role not found</h1>
          <p className="mt-2 text-muted-foreground">This role may have been removed or is no longer active.</p>
          <Button className="mt-6" asChild><Link to="/jobs">Browse Roles</Link></Button>
        </div>
      </Layout>
    );
  }

  const similarRoles = getActiveJobs().filter((j) => j.id !== job.id).slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/jobs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Roles</Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-foreground">{job.title}</h1>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary"><MapPin className="mr-1 h-3 w-3" /> {job.locations.join(", ")}</Badge>
                      <Badge variant="secondary"><Briefcase className="mr-1 h-3 w-3" /> {job.type}</Badge>
                      <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" /> {job.experienceRange}</Badge>
                      <Badge variant="secondary"><DollarSign className="mr-1 h-3 w-3" /> {job.salaryRange}</Badge>
                      {job.urgency === "Urgent" && (
                        <Badge className="bg-destructive/10 text-destructive"><Zap className="mr-1 h-3 w-3" /> Urgent</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="bg-accent text-accent-foreground hover:bg-gold-dark" asChild>
                    <Link to="/signup">Apply via Platform</Link>
                  </Button>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-secondary p-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    Your application will be submitted to relevant hiring partners by our team. You'll be able to track your status from your dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Role Description</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
              </CardContent>
            </Card>

            {/* Requirements */}
            {job.requirements.length > 0 && (
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
            )}

            {/* Responsibilities */}
            {job.responsibilities.length > 0 && (
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
            )}

            {/* Skills */}
            {job.skills.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="font-display text-lg">Required Skills</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((s, i) => (
                      <Badge key={i} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Role Summary</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location(s)</span>
                  <span className="font-medium text-foreground">{job.locations.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium text-foreground">{job.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium text-foreground">{job.experienceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Salary</span>
                  <span className="font-medium text-foreground">{job.salaryRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Urgency</span>
                  <span className="font-medium text-foreground">{job.urgency}</span>
                </div>
              </CardContent>
            </Card>

            {similarRoles.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="font-display text-lg">Similar Roles</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {similarRoles.map((rj) => (
                    <Link key={rj.id} to={`/jobs/${rj.id}`} className="block rounded-lg border border-border p-3 transition-colors hover:bg-secondary">
                      <div className="font-sans text-sm font-semibold text-foreground">{rj.title}</div>
                      <div className="text-xs text-muted-foreground">{rj.locations.join(", ")}</div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobDetail;
