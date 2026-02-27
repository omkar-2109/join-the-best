import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const emptyForm = {
  title: "", locations: [] as string[], type: "Full-time", salary_range: "", experience_range: "",
  urgency: "Normal", description: "", requirements: [] as string[], responsibilities: [] as string[],
  skills: [] as string[], active: true, internal_company_ids: [] as string[],
};

const AdminRoles = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    setJobs(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchJobs();
  }, [isAdmin]);

  if (authLoading) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/login" />;

  const splitComma = (v: string) => v.split(",").map((s) => s.trim()).filter(Boolean);

  const openCreate = () => { setEditingId(null); setForm({ ...emptyForm }); setDialogOpen(true); };

  const openEdit = (job: any) => {
    setEditingId(job.id);
    setForm({
      title: job.title, locations: job.locations || [], type: job.type, salary_range: job.salary_range,
      experience_range: job.experience_range, urgency: job.urgency, description: job.description,
      requirements: job.requirements || [], responsibilities: job.responsibilities || [],
      skills: job.skills || [], active: job.active, internal_company_ids: job.internal_company_ids || [],
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title) { toast.error("Title is required"); return; }
    if (editingId) {
      const { error } = await supabase.from("jobs").update(form as any).eq("id", editingId);
      if (error) toast.error(error.message);
      else toast.success("Role updated");
    } else {
      const { error } = await supabase.from("jobs").insert(form as any);
      if (error) toast.error(error.message);
      else toast.success("Role created");
    }
    setDialogOpen(false);
    fetchJobs();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Role deleted"); fetchJobs(); }
  };

  const toggleActive = async (job: any) => {
    await supabase.from("jobs").update({ active: !job.active } as any).eq("id", job.id);
    fetchJobs();
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Manage Roles</h1>
            <p className="text-sm text-muted-foreground">Create and manage job roles visible to candidates</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground hover:bg-gold-dark" onClick={openCreate}>
                <Plus className="mr-2 h-4 w-4" /> Create Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">{editingId ? "Edit Role" : "Create New Role"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label>Role Title</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g., Senior Backend Developer" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Job Type</Label>
                    <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Urgency</Label>
                    <Select value={form.urgency} onValueChange={(v) => setForm({ ...form, urgency: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Locations (comma-separated)</Label>
                  <Input value={form.locations.join(", ")} onChange={(e) => setForm({ ...form, locations: splitComma(e.target.value) })} placeholder="Mumbai, Bangalore, Remote" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Salary Range</Label>
                    <Input value={form.salary_range} onChange={(e) => setForm({ ...form, salary_range: e.target.value })} placeholder="₹8-15 LPA" />
                  </div>
                  <div className="space-y-2">
                    <Label>Experience Range</Label>
                    <Input value={form.experience_range} onChange={(e) => setForm({ ...form, experience_range: e.target.value })} placeholder="3-5 years" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Describe the role..." />
                </div>
                <div className="space-y-2">
                  <Label>Requirements (comma-separated)</Label>
                  <Textarea value={form.requirements.join(", ")} onChange={(e) => setForm({ ...form, requirements: splitComma(e.target.value) })} rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Responsibilities (comma-separated)</Label>
                  <Textarea value={form.responsibilities.join(", ")} onChange={(e) => setForm({ ...form, responsibilities: splitComma(e.target.value) })} rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Skills (comma-separated)</Label>
                  <Input value={form.skills.join(", ")} onChange={(e) => setForm({ ...form, skills: splitComma(e.target.value) })} placeholder="React, TypeScript, AWS" />
                </div>
                <div className="space-y-2">
                  <Label>Internal Partner IDs (hidden from candidates)</Label>
                  <Input value={form.internal_company_ids.join(", ")} onChange={(e) => setForm({ ...form, internal_company_ids: splitComma(e.target.value) })} placeholder="partner-001" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
                  <Label>Active (visible to candidates)</Label>
                </div>
                <Button className="w-full bg-primary text-primary-foreground" onClick={handleSave}>
                  {editingId ? "Update Role" : "Create Role"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="py-16 text-center text-muted-foreground">Loading roles...</div>
        ) : jobs.length === 0 ? (
          <Card><CardContent className="py-16 text-center"><p className="text-muted-foreground">No roles created yet. Click "Create Role" to get started.</p></CardContent></Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job: any) => (
              <Card key={job.id} className={`transition-opacity ${!job.active ? "opacity-60" : ""}`}>
                <CardContent className="p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex gap-1.5">
                      <Badge variant={job.active ? "default" : "secondary"}>{job.active ? "Active" : "Paused"}</Badge>
                      {job.urgency === "Urgent" && (
                        <Badge className="bg-destructive/10 text-destructive"><Zap className="mr-1 h-3 w-3" /> Urgent</Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(job)}><Pencil className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(job.id)}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-foreground">{job.title}</h3>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <div>{job.locations?.join(", ")}</div>
                    <div>{job.type} · {job.salary_range} · {job.experience_range}</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Created: {new Date(job.created_at).toLocaleDateString()}</span>
                    <Switch checked={job.active} onCheckedChange={() => toggleActive(job)} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminRoles;
