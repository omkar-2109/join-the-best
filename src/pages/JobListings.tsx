import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Filter, Grid, List, Bookmark, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import { sampleJobs } from "@/data/sampleData";

const JobListings = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-navy py-10">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 font-display text-3xl font-bold text-primary-foreground">Find Your Next Role</h1>
          <p className="text-primary-foreground/70">Browse opportunities from leading companies worldwide</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Job title or keyword" className="pl-10" />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Location" className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="lead">Lead / Manager</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary text-primary-foreground">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{sampleJobs.length}</span> jobs
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Job Cards */}
        <div className={viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
          {sampleJobs.map((job) => (
            <Card key={job.id} className="group transition-all hover:shadow-premium">
              <CardContent className={`p-5 ${viewMode === "list" ? "flex items-center gap-4" : ""}`}>
                <div className={viewMode === "list" ? "flex flex-1 items-center gap-4" : ""}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-sans text-sm font-bold text-primary">
                    {job.companyLogo}
                  </div>
                  <div className={viewMode === "list" ? "flex-1" : "mt-3"}>
                    <div className="flex items-start justify-between">
                      <div>
                        <Link to={`/jobs/${job.id}`} className="font-sans text-base font-semibold text-foreground hover:text-primary transition-colors">
                          {job.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                      <button
                        onClick={() => toggleSave(job.id)}
                        className="shrink-0 text-muted-foreground transition-colors hover:text-accent"
                      >
                        <Bookmark className={`h-4 w-4 ${savedJobs.has(job.id) ? "fill-accent text-accent" : ""}`} />
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {job.location}
                      </span>
                      <span className="text-xs text-muted-foreground">{job.salary}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{job.postedDate}</span>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" asChild>
                        <Link to={`/jobs/${job.id}`}>
                          View <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default JobListings;
