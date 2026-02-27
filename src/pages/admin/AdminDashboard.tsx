import { Briefcase, Users, CheckCircle, Clock, Send, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/layout/AdminLayout";
import { getJobs, getCandidates, getApplications } from "@/data/store";

const AdminDashboard = () => {
  const jobs = getJobs();
  const candidates = getCandidates();
  const applications = getApplications();

  const activeRoles = jobs.filter((j) => j.active).length;
  const pendingVerifications = candidates.filter((c) => c.verificationStatus === "pending").length;
  const submittedToPartner = applications.filter((a) => a.status === "Submitted to Partner").length;
  const interviews = applications.filter((a) => a.status === "Interview Scheduled").length;
  const offers = applications.filter((a) => a.status === "Offer").length;

  const statCards = [
    { label: "Active Roles", value: activeRoles, icon: Briefcase, color: "bg-primary/10 text-primary" },
    { label: "Total Applications", value: applications.length, icon: Users, color: "bg-accent/10 text-accent-foreground" },
    { label: "Pending Verifications", value: pendingVerifications, icon: Clock, color: "bg-amber-100 text-amber-700" },
    { label: "Submitted to Partners", value: submittedToPartner, icon: Send, color: "bg-purple-100 text-purple-700" },
    { label: "Interviews", value: interviews, icon: CheckCircle, color: "bg-blue-100 text-blue-700" },
    { label: "Placements", value: offers, icon: Trophy, color: "bg-green-100 text-green-700" },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your recruitment pipeline</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statCards.map((s) => (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent candidates */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Recent Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            {candidates.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No candidates registered yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-2 font-medium text-muted-foreground">Name</th>
                      <th className="pb-2 font-medium text-muted-foreground">Email</th>
                      <th className="pb-2 font-medium text-muted-foreground">Type</th>
                      <th className="pb-2 font-medium text-muted-foreground">Verification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.slice(0, 10).map((c, i) => (
                      <tr key={c.id} className={`border-b border-border ${i % 2 === 0 ? "bg-secondary/50" : ""}`}>
                        <td className="py-2.5 font-medium text-foreground">{c.name}</td>
                        <td className="py-2.5 text-muted-foreground">{c.email}</td>
                        <td className="py-2.5 capitalize text-muted-foreground">{c.experienceType}</td>
                        <td className="py-2.5">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            c.verificationStatus === "verified"
                              ? "bg-green-100 text-green-700"
                              : c.verificationStatus === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {c.verificationStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent applications */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No applications yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="pb-2 font-medium text-muted-foreground">Candidate</th>
                      <th className="pb-2 font-medium text-muted-foreground">Role</th>
                      <th className="pb-2 font-medium text-muted-foreground">Status</th>
                      <th className="pb-2 font-medium text-muted-foreground">Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.slice(0, 10).map((app, i) => {
                      const candidate = getCandidates().find((c) => c.id === app.candidateId);
                      const job = getJobs().find((j) => j.id === app.jobId);
                      return (
                        <tr key={app.id} className={`border-b border-border ${i % 2 === 0 ? "bg-secondary/50" : ""}`}>
                          <td className="py-2.5 font-medium text-foreground">{candidate?.name || "Unknown"}</td>
                          <td className="py-2.5 text-muted-foreground">{job?.title || "Unknown"}</td>
                          <td className="py-2.5">
                            <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                              {app.status}
                            </span>
                          </td>
                          <td className="py-2.5 text-muted-foreground">{app.appliedAt}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
