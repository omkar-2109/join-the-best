import { useState } from "react";
import { Plus, Pencil, Trash2, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AdminLayout from "@/components/layout/AdminLayout";
import { getJobs, saveJob, deleteJob, genId, type Job } from "@/data/store";

const emptyJob: Omit<Job, "id" | "createdAt"> = {
  title: "", locations: [], type: "Full-time", salaryRange: "", experienceRange: "",
  urgency: "Normal", description: "", requirements: [], responsibilities: [],
  skills: [], active: true, internalCompanyIds: [],
};

const AdminRoles = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [form, setForm] = useState(emptyJob);

  const jobs = getJobs();
  const refresh = () => setRefreshKey((k) => k + 1);

  const openCreate = () => {
    setEditingJob(null);
    setForm({ ...emptyJob });
    setDialogOpen(true);
  };

  const openEdit = (job: Job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      locations: job.locations,
      type: job.type,
      salaryRange: job.salaryRange,
      experienceRange: job.experienceRange,
      urgency: job.urgency,
      description: job.description,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      skills: job.skills,
      active: job.active,
      internalCompanyIds: job.internalCompanyIds,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const job: Job = {
      id: editingJob?.id || genId(),
      ...form,
      createdAt: editingJob?.createdAt || new Date().toISOString().split("T")[0],
    };
    saveJob(job);
    setDialogOpen(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteJob(id);
    refresh();
  };

  const toggleActive = (job: Job) => {
    saveJob({ ...job, active: !job.active });
    refresh();
  };

  const splitComma = (v: string) => v.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6" key={refreshKey}>
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
                <DialogTitle className="font-display text-xl">
                  {editingJob ? "Edit Role" : "Create New Role"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label>Role Title</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g., Senior Backend Developer" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Job Type</Label>
                    <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as Job["type"] })}>
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
                    <Select value={form.urgency} onValueChange={(v) => setForm({ ...form, urgency: v as Job["urgency"] })}>
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
                    <Input value={form.salaryRange} onChange={(e) => setForm({ ...form, salaryRange: e.target.value })} placeholder="₹8-15 LPA" />
                  </div>
                  <div className="space-y-2">
                    <Label>Experience Range</Label>
                    <Input value={form.experienceRange} onChange={(e) => setForm({ ...form, experienceRange: e.target.value })} placeholder="3-5 years" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Describe the role..." />
                </div>
                <div className="space-y-2">
                  <Label>Requirements (comma-separated)</Label>
                  <Textarea value={form.requirements.join(", ")} onChange={(e) => setForm({ ...form, requirements: splitComma(e.target.value) })} rows={2} placeholder="3+ years experience, React, Node.js" />
                </div>
                <div className="space-y-2">
                  <Label>Responsibilities (comma-separated)</Label>
                  <Textarea value={form.responsibilities.join(", ")} onChange={(e) => setForm({ ...form, responsibilities: splitComma(e.target.value) })} rows={2} placeholder="Design APIs, Code reviews, Mentoring" />
                </div>
                <div className="space-y-2">
                  <Label>Skills (comma-separated)</Label>
                  <Input value={form.skills.join(", ")} onChange={(e) => setForm({ ...form, skills: splitComma(e.target.value) })} placeholder="React, TypeScript, AWS" />
                </div>
                <div className="space-y-2">
                  <Label>Internal Partner Company IDs (comma-separated, hidden from candidates)</Label>
                  <Input value={form.internalCompanyIds.join(", ")} onChange={(e) => setForm({ ...form, internalCompanyIds: splitComma(e.target.value) })} placeholder="partner-001, partner-002" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
                  <Label>Active (visible to candidates)</Label>
                </div>
                <Button className="w-full bg-primary text-primary-foreground" onClick={handleSave}>
                  {editingJob ? "Update Role" : "Create Role"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {jobs.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">No roles created yet. Click "Create Role" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Card key={job.id} className={`transition-opacity ${!job.active ? "opacity-60" : ""}`}>
                <CardContent className="p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex gap-1.5">
                      <Badge variant={job.active ? "default" : "secondary"}>
                        {job.active ? "Active" : "Paused"}
                      </Badge>
                      {job.urgency === "Urgent" && (
                        <Badge className="bg-destructive/10 text-destructive">
                          <Zap className="mr-1 h-3 w-3" /> Urgent
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(job)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(job.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-foreground">{job.title}</h3>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <div>{job.locations.join(", ")}</div>
                    <div>{job.type} · {job.salaryRange} · {job.experienceRange}</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Created: {job.createdAt}</span>
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
