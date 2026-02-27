import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Filter, Bookmark, ArrowRight, Briefcase, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import { getActiveJobs } from "@/data/store";

const JobListings = () => {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const allJobs = getActiveJobs();

  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesSearch = !search || job.title.toLowerCase().includes(search.toLowerCase()) || job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchesLocation = !locationFilter || job.locations.some((l) => l.toLowerCase().includes(locationFilter.toLowerCase()));
      const matchesType = !typeFilter || job.type === typeFilter;
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [allJobs, search, locationFilter, typeFilter]);

  const toggleSave = (id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <Layout>
      <section className="gradient-navy py-10">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 font-display text-3xl font-bold text-primary-foreground">Browse Open Roles</h1>
          <p className="text-primary-foreground/70">Explore curated opportunities. Apply via the platform — we handle the rest.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Role or skill" className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Location" className="pl-10" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setSearch(""); setLocationFilter(""); setTypeFilter(""); }}>
              Clear
            </Button>
          </div>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> roles
        </p>

        {filteredJobs.length === 0 ? (
          <div className="py-20 text-center">
            <Briefcase className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
            <h3 className="font-display text-lg font-semibold text-foreground">No roles found</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or check back later for new openings.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="group transition-all hover:shadow-premium">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex gap-1.5">
                      <Badge variant="secondary">{job.type}</Badge>
                      {job.urgency === "Urgent" && (
                        <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">
                          <Zap className="mr-1 h-3 w-3" /> Urgent
                        </Badge>
                      )}
                    </div>
                    <button onClick={() => toggleSave(job.id)} className="text-muted-foreground transition-colors hover:text-accent">
                      <Bookmark className={`h-4 w-4 ${savedJobs.has(job.id) ? "fill-accent text-accent" : ""}`} />
                    </button>
                  </div>
                  <Link to={`/jobs/${job.id}`} className="font-sans text-base font-semibold text-foreground hover:text-primary transition-colors">
                    {job.title}
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.locations.join(", ")}</span>
                    <span>{job.salaryRange}</span>
                    <span>{job.experienceRange}</span>
                  </div>
                  <div className="mt-4">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" asChild>
                      <Link to={`/jobs/${job.id}`}>Apply via Platform <ArrowRight className="ml-1 h-3 w-3" /></Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobListings;
