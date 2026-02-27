import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Briefcase, Clock, DollarSign, ArrowLeft, Zap, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const JobDetail = () => {
  const { id } = useParams();
  const { user, candidateProfileId } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [similarRoles, setSimilarRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase.from("jobs").select("*").eq("id", id).maybeSingle().then(({ data }) => {
      setJob(data);
      setLoading(false);
    });
    supabase.from("jobs").select("*").eq("active", true).neq("id", id).limit(3).then(({ data }) => {
      setSimilarRoles(data || []);
    });
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      toast.info("Please register or log in to apply");
      navigate("/signup");
      return;
    }
    if (!candidateProfileId) {
      toast.error("Please complete your profile first");
      return;
    }
    setApplying(true);
    const { error } = await supabase.from("applications").insert({
      candidate_id: candidateProfileId,
      job_id: id,
      location_preference: job?.locations?.[0] || "",
    } as any);
    setApplying(false);
    if (error) {
      if (error.code === "23505") toast.error("You've already applied to this role");
      else toast.error(error.message);
    } else {
      toast.success("Application submitted! Track it from your dashboard.");
      navigate("/seeker-dashboard");
    }
  };

  if (loading) {
    return <Layout><div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading...</div></Layout>;
  }

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/jobs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Roles</Link>
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-bold text-foreground">{job.title}</h1>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary"><MapPin className="mr-1 h-3 w-3" /> {job.locations?.join(", ")}</Badge>
                      <Badge variant="secondary"><Briefcase className="mr-1 h-3 w-3" /> {job.type}</Badge>
                      <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" /> {job.experience_range}</Badge>
                      <Badge variant="secondary"><DollarSign className="mr-1 h-3 w-3" /> {job.salary_range}</Badge>
                      {job.urgency === "Urgent" && <Badge className="bg-destructive/10 text-destructive"><Zap className="mr-1 h-3 w-3" /> Urgent</Badge>}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="bg-accent text-accent-foreground hover:bg-gold-dark" onClick={handleApply} disabled={applying}>
                    {applying ? "Submitting..." : "Apply via Platform"}
                  </Button>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-secondary p-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Your application will be submitted to relevant hiring partners by our team. You'll be able to track your status from your dashboard.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Role Description</CardTitle></CardHeader>
              <CardContent><p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p></CardContent>
            </Card>

            {job.requirements?.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="font-display text-lg">Requirements</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.requirements.map((req: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {job.responsibilities?.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="font-display text-lg">Responsibilities</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{resp}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {job.skills?.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="font-display text-lg">Required Skills</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((s: string, i: number) => <Badge key={i} variant="secondary">{s}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Role Summary</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Location(s)</span><span className="font-medium text-foreground">{job.locations?.join(", ")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium text-foreground">{job.type}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Experience</span><span className="font-medium text-foreground">{job.experience_range}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Salary</span><span className="font-medium text-foreground">{job.salary_range}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Urgency</span><span className="font-medium text-foreground">{job.urgency}</span></div>
              </CardContent>
            </Card>

            {similarRoles.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="font-display text-lg">Similar Roles</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {similarRoles.map((rj: any) => (
                    <Link key={rj.id} to={`/jobs/${rj.id}`} className="block rounded-lg border border-border p-3 transition-colors hover:bg-secondary">
                      <div className="font-sans text-sm font-semibold text-foreground">{rj.title}</div>
                      <div className="text-xs text-muted-foreground">{rj.locations?.join(", ")}</div>
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
