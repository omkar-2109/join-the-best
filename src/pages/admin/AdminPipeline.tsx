import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ALL_STATUSES = [
  "Applied", "Profile Shortlisted", "Submitted to Partner",
  "Interview Scheduled", "Offer", "Rejected", "On Hold",
];

const AdminPipeline = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const [appsRes, candsRes, jobsRes] = await Promise.all([
      supabase.from("applications").select("*").order("applied_at", { ascending: false }),
      supabase.from("candidate_profiles").select("*"),
      supabase.from("jobs").select("id, title"),
    ]);
    setApplications(appsRes.data || []);
    setCandidates(candsRes.data || []);
    setJobs(jobsRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin]);

  if (authLoading) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/login" />;

  const updateStatus = async (appId: string, status: string) => {
    const { error } = await supabase.from("applications").update({ status } as any).eq("id", appId);
    if (error) toast.error(error.message);
    else { toast.success("Status updated"); fetchData(); }
  };

  const saveNote = async (appId: string) => {
    const { error } = await supabase.from("applications").update({ internal_notes: noteText } as any).eq("id", appId);
    if (error) toast.error(error.message);
    else { toast.success("Note saved"); setEditingId(null); setNoteText(""); fetchData(); }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Candidate Pipeline</h1>
          <p className="text-sm text-muted-foreground">Manage candidate applications and update statuses</p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-muted-foreground">Loading pipeline...</div>
        ) : applications.length === 0 ? (
          <Card><CardContent className="py-16 text-center"><p className="text-muted-foreground">No applications in the pipeline yet.</p></CardContent></Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50 text-left">
                      <th className="px-4 py-3 font-medium text-muted-foreground">Candidate</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Role</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Experience</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Verification</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 font-medium text-muted-foreground">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app: any, i: number) => {
                      const candidate = candidates.find((c: any) => c.id === app.candidate_id);
                      const job = jobs.find((j: any) => j.id === app.job_id);
                      return (
                        <tr key={app.id} className={`border-b border-border ${i % 2 === 0 ? "bg-secondary/30" : ""}`}>
                          <td className="px-4 py-3">
                            <div className="font-medium text-foreground">{candidate?.name || "Unknown"}</div>
                            <div className="text-xs text-muted-foreground">{candidate?.email}</div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{job?.title || "Unknown"}</td>
                          <td className="px-4 py-3 text-muted-foreground capitalize">{candidate?.experience_type} · {candidate?.experience_years}y</td>
                          <td className="px-4 py-3">
                            <Badge className={candidate?.verification_status === "verified" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>
                              {candidate?.verification_status || "pending"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Select value={app.status} onValueChange={(v) => updateStatus(app.id, v)}>
                              <SelectTrigger className="h-8 w-44 text-xs"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {ALL_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-4 py-3">
                            {editingId === app.id ? (
                              <div className="flex gap-1">
                                <Textarea className="h-16 w-40 text-xs" value={noteText} onChange={(e) => setNoteText(e.target.value)} />
                                <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => saveNote(app.id)}>Save</Button>
                              </div>
                            ) : (
                              <button className="max-w-[160px] truncate text-xs text-muted-foreground hover:text-foreground"
                                onClick={() => { setEditingId(app.id); setNoteText(app.internal_notes || ""); }}>
                                {app.internal_notes || "Add note..."}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPipeline;
