import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  getApplications, getCandidates, getJobs, saveApplication,
  type ApplicationStatus, type CandidateApplication,
} from "@/data/store";

const ALL_STATUSES: ApplicationStatus[] = [
  "Applied", "Profile Shortlisted", "Submitted to Partner",
  "Interview Scheduled", "Offer", "Rejected", "On Hold",
];

const AdminPipeline = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const applications = getApplications();
  const candidates = getCandidates();
  const jobs = getJobs();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  const refresh = () => setRefreshKey((k) => k + 1);

  const updateStatus = (app: CandidateApplication, status: ApplicationStatus) => {
    saveApplication({ ...app, status, updatedAt: new Date().toISOString().split("T")[0] });
    refresh();
  };

  const saveNote = (app: CandidateApplication) => {
    saveApplication({ ...app, internalNotes: noteText, updatedAt: new Date().toISOString().split("T")[0] });
    setEditingId(null);
    setNoteText("");
    refresh();
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6" key={refreshKey}>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Candidate Pipeline</h1>
          <p className="text-sm text-muted-foreground">Manage candidate applications and update statuses</p>
        </div>

        {applications.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">No applications in the pipeline yet.</p>
            </CardContent>
          </Card>
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
                      <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, i) => {
                      const candidate = candidates.find((c) => c.id === app.candidateId);
                      const job = jobs.find((j) => j.id === app.jobId);
                      return (
                        <tr key={app.id} className={`border-b border-border ${i % 2 === 0 ? "bg-secondary/30" : ""}`}>
                          <td className="px-4 py-3">
                            <div className="font-medium text-foreground">{candidate?.name || "Unknown"}</div>
                            <div className="text-xs text-muted-foreground">{candidate?.email}</div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{job?.title || "Unknown"}</td>
                          <td className="px-4 py-3 text-muted-foreground capitalize">{candidate?.experienceType} · {candidate?.experienceYears}y</td>
                          <td className="px-4 py-3">
                            <Badge className={
                              candidate?.verificationStatus === "verified"
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-100 text-amber-700"
                            }>
                              {candidate?.verificationStatus || "pending"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Select value={app.status} onValueChange={(v) => updateStatus(app, v as ApplicationStatus)}>
                              <SelectTrigger className="h-8 w-44 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {ALL_STATUSES.map((s) => (
                                  <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-4 py-3">
                            {editingId === app.id ? (
                              <div className="flex gap-1">
                                <Textarea className="h-16 w-40 text-xs" value={noteText} onChange={(e) => setNoteText(e.target.value)} />
                                <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => saveNote(app)}>Save</Button>
                              </div>
                            ) : (
                              <button
                                className="max-w-[160px] truncate text-xs text-muted-foreground hover:text-foreground"
                                onClick={() => { setEditingId(app.id); setNoteText(app.internalNotes); }}
                              >
                                {app.internalNotes || "Add note..."}
                              </button>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <Button size="sm" variant="ghost" className="h-7 text-xs text-primary">
                              View
                            </Button>
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
