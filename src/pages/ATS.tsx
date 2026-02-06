import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { sampleApplications } from "@/data/sampleData";

const stages = ["Applied", "Screening", "Interview", "Offer", "Hired"] as const;

const stageColors: Record<string, string> = {
  Applied: "border-t-blue-400",
  Screening: "border-t-amber-400",
  Interview: "border-t-purple-400",
  Offer: "border-t-green-400",
  Hired: "border-t-emerald-500",
};

const ATS = () => {
  const grouped = stages.map((stage) => ({
    stage,
    candidates: sampleApplications.filter((a) => a.status === stage),
  }));

  return (
    <Layout>
      <section className="gradient-navy py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-2xl font-bold text-primary-foreground">Applicant Tracking</h1>
          <p className="text-sm text-primary-foreground/70">Manage candidates through your hiring pipeline</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex gap-3">
          <Select>
            <SelectTrigger className="w-48"><SelectValue placeholder="All Positions" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              <SelectItem value="swe">Software Engineer</SelectItem>
              <SelectItem value="pm">Product Marketing</SelectItem>
              <SelectItem value="ds">Data Scientist</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {grouped.map(({ stage, candidates }) => (
            <div key={stage} className="min-w-[260px] flex-1">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-sans text-sm font-semibold text-foreground">{stage}</h3>
                <Badge variant="secondary" className="text-xs">{candidates.length}</Badge>
              </div>
              <div className="space-y-3">
                {candidates.map((c) => (
                  <Card key={c.id} className={`border-t-2 ${stageColors[stage]} cursor-pointer transition-all hover:shadow-premium`}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {c.candidateAvatar}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-foreground">{c.candidateName}</div>
                          <div className="text-xs text-muted-foreground">{c.position}</div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`h-3 w-3 ${s <= Math.round(c.rating) ? "fill-accent text-accent" : "text-border"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{c.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {candidates.length === 0 && (
                  <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                    No candidates
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ATS;
