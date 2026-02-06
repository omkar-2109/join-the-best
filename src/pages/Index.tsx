import { Link } from "react-router-dom";
import { Search, MapPin, Briefcase, Users, Building, ArrowRight, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { sampleJobs, testimonials, stats } from "@/data/sampleData";
import { useState } from "react";

const HeroSection = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <section className="gradient-navy relative overflow-hidden py-20 lg:py-28">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground/80">
            <Star className="h-3.5 w-3.5 text-accent" />
            Trusted by 10,000+ companies worldwide
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Connecting Global Talent{" "}
            <span className="text-accent">with Opportunity</span>
          </h1>
          <p className="mb-10 text-lg text-primary-foreground/70 md:text-xl">
            Discover your next career move or find the perfect candidate. BBS bridges the gap between world-class talent and leading organizations.
          </p>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl rounded-xl bg-card p-2 shadow-premium">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Job title or keyword"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="border-0 pl-10 shadow-none focus-visible:ring-0"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="border-0 pl-10 shadow-none focus-visible:ring-0"
                />
              </div>
              <Button className="bg-accent text-accent-foreground hover:bg-gold-dark" asChild>
                <Link to="/jobs">
                  Search Jobs
                </Link>
              </Button>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/jobs">
                <Briefcase className="mr-2 h-4 w-4" />
                Find Jobs
              </Link>
            </Button>
            <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/recruiter-dashboard">
                <Users className="mr-2 h-4 w-4" />
                Post a Job
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => (
  <section className="border-b border-border bg-card py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-display text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => {
  const seekerSteps = [
    { icon: Search, title: "Search Jobs", description: "Browse thousands of opportunities across industries and locations." },
    { icon: CheckCircle, title: "Apply with Ease", description: "Submit your application with a polished profile and one-click apply." },
    { icon: Briefcase, title: "Get Hired", description: "Track your applications, ace interviews, and land your dream role." },
  ];

  const recruiterSteps = [
    { icon: Building, title: "Post Positions", description: "Create detailed job listings that attract top-tier talent." },
    { icon: Users, title: "Review Candidates", description: "Use our ATS to screen, shortlist, and manage applicants." },
    { icon: CheckCircle, title: "Make Great Hires", description: "Streamline interviews and close offers faster than ever." },
  ];

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground">How It Works</h2>
          <p className="text-muted-foreground">Simple steps to connect talent with opportunity</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Job Seekers */}
          <div>
            <h3 className="mb-6 text-center font-display text-xl font-semibold text-foreground">For Job Seekers</h3>
            <div className="space-y-4">
              {seekerSteps.map((step, i) => (
                <div key={step.title} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-premium">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-accent">Step {i + 1}</span>
                    </div>
                    <h4 className="font-sans text-sm font-semibold text-foreground">{step.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recruiters */}
          <div>
            <h3 className="mb-6 text-center font-display text-xl font-semibold text-foreground">For Recruiters</h3>
            <div className="space-y-4">
              {recruiterSteps.map((step, i) => (
                <div key={step.title} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-premium">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-primary">Step {i + 1}</span>
                    </div>
                    <h4 className="font-sans text-sm font-semibold text-foreground">{step.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedJobsSection = () => (
  <section className="bg-secondary py-16 lg:py-20">
    <div className="container mx-auto px-4">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-foreground">Featured Opportunities</h2>
          <p className="mt-2 text-muted-foreground">Top positions from leading companies</p>
        </div>
        <Button variant="ghost" className="hidden text-primary hover:text-primary/80 sm:flex" asChild>
          <Link to="/jobs">
            View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sampleJobs.slice(0, 6).map((job) => (
          <Card key={job.id} className="group transition-all hover:shadow-premium">
            <CardContent className="p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-sans text-sm font-bold text-primary">
                  {job.companyLogo}
                </div>
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                  {job.type}
                </span>
              </div>
              <h3 className="mb-1 font-sans text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {job.location}
                </span>
                <span>{job.salary}</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{job.postedDate}</span>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" asChild>
                  <Link to={`/jobs/${job.id}`}>
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Button variant="outline" asChild>
          <Link to="/jobs">View All Jobs</Link>
        </Button>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-16 lg:py-20">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-3 font-display text-3xl font-bold text-foreground">What People Say</h2>
        <p className="text-muted-foreground">Hear from our users across the globe</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.name} className="shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="mb-4 text-sm italic text-muted-foreground">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const TrustedBySection = () => {
  const partners = ["TechVision", "GlobalFinance", "DesignFlow", "BrandForge", "AI Dynamics", "PeopleFirst"];
  return (
    <section className="border-b border-border py-8">
      <div className="container mx-auto px-4">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by leading organizations worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {partners.map((name) => (
            <div key={name} className="text-lg font-bold text-muted-foreground/40 transition-colors hover:text-muted-foreground/60">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="gradient-navy py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">
        Ready to Transform Your Hiring?
      </h2>
      <p className="mx-auto mb-8 max-w-lg text-primary-foreground/70">
        Whether you're looking for your next opportunity or the perfect candidate, BBS has you covered.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-gold-dark" asChild>
          <Link to="/signup">Create Free Account</Link>
        </Button>
        <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
          <Link to="/about">Learn More</Link>
        </Button>
      </div>
    </div>
  </section>
);

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <TrustedBySection />
      <HowItWorksSection />
      <FeaturedJobsSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
