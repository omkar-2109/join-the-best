import { Link } from "react-router-dom";
import { Search, MapPin, Briefcase, ArrowRight, CheckCircle, Star, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

const stats = [
  { label: "Candidates Placed", value: "50K+" },
  { label: "Hiring Partners", value: "500+" },
  { label: "Satisfaction Rate", value: "95%" },
  { label: "Active Roles", value: "1K+" },
];

const testimonials = [
  { name: "Arjun Mehta", role: "Software Developer", quote: "BBS helped me land my dream role within two weeks. The process was seamless and completely transparent.", avatar: "AM" },
  { name: "Sneha Patil", role: "Marketing Professional", quote: "I loved that I could focus on the role itself without any bias. The platform team kept me updated at every step.", avatar: "SP" },
  { name: "Rahul Verma", role: "Data Analyst", quote: "The application tracker made it so easy to see where I stood. Highly recommend BBS to anyone looking for quality opportunities.", avatar: "RV" },
];

const HeroSection = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <section className="gradient-navy relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>
      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground/80">
            <Shield className="h-3.5 w-3.5 text-accent" />
            Platform-managed hiring — your identity, our priority
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Your Career, <span className="text-accent">Our Priority</span>
          </h1>
          <p className="mb-10 text-lg text-primary-foreground/70 md:text-xl">
            Apply to curated roles through BBS. We match you with the right opportunities and manage the entire process — so you can focus on what matters.
          </p>
          <div className="mx-auto max-w-2xl rounded-xl bg-card p-2 shadow-premium">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Role or keyword" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} className="border-0 pl-10 shadow-none focus-visible:ring-0" />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Location" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="border-0 pl-10 shadow-none focus-visible:ring-0" />
              </div>
              <Button className="bg-accent text-accent-foreground hover:bg-gold-dark" asChild>
                <Link to="/jobs">Browse Roles</Link>
              </Button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/signup"><Users className="mr-2 h-4 w-4" />Register & Start Applying</Link>
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
  const steps = [
    { icon: Users, title: "Register", description: "Create your profile with your experience and preferences." },
    { icon: Search, title: "Browse Roles", description: "Explore curated opportunities — no company names, just the role." },
    { icon: Briefcase, title: "Apply via Platform", description: "Submit your application. We forward it to relevant hiring partners." },
    { icon: CheckCircle, title: "Track Status", description: "Follow your application from shortlisting to offer — all in one place." },
  ];

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground">How It Works</h2>
          <p className="text-muted-foreground">Four simple steps to your next opportunity</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-premium">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <step.icon className="h-6 w-6" />
              </div>
              <span className="mb-1 text-xs font-semibold text-accent">Step {i + 1}</span>
              <h4 className="mb-2 font-sans text-sm font-semibold text-foreground">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedRolesSection = () => {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("jobs").select("*").eq("active", true).limit(6).then(({ data }) => {
      setJobs(data || []);
    });
  }, []);

  if (jobs.length === 0) {
    return (
      <section className="bg-secondary py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">Featured Roles</h2>
          <p className="mt-2 text-muted-foreground">New roles are added regularly. Check back soon!</p>
          <Button className="mt-6" variant="outline" asChild><Link to="/jobs">Browse All Roles</Link></Button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-secondary py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Featured Roles</h2>
            <p className="mt-2 text-muted-foreground">Latest opportunities curated by our team</p>
          </div>
          <Button variant="ghost" className="hidden text-primary hover:text-primary/80 sm:flex" asChild>
            <Link to="/jobs">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job: any) => (
            <Card key={job.id} className="group transition-all hover:shadow-premium">
              <CardContent className="p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-sans text-sm font-bold text-primary">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1.5">
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{job.type}</span>
                    {job.urgency === "Urgent" && <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">Urgent</span>}
                  </div>
                </div>
                <h3 className="mb-1 font-sans text-base font-semibold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.locations?.join(", ")}</span>
                  <span>{job.salary_range}</span>
                  <span>{job.experience_range}</span>
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
      </div>
    </section>
  );
};

const TestimonialsSection = () => (
  <section className="py-16 lg:py-20">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-3 font-display text-3xl font-bold text-foreground">What Candidates Say</h2>
        <p className="text-muted-foreground">Real stories from professionals who found their next role through BBS</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.name} className="shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex gap-1">{[1,2,3,4,5].map((s) => <Star key={s} className="h-4 w-4 fill-accent text-accent" />)}</div>
              <p className="mb-4 text-sm italic text-muted-foreground">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{t.avatar}</div>
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

const CTASection = () => (
  <section className="gradient-navy py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">Ready to Find Your Next Role?</h2>
      <p className="mx-auto mb-8 max-w-lg text-primary-foreground/70">Register today and let BBS connect you with the right opportunities. No bias, no noise — just the right match.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-gold-dark" asChild><Link to="/signup">Register Now</Link></Button>
        <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild><Link to="/about">Learn More</Link></Button>
      </div>
    </div>
  </section>
);

const Index = () => (
  <Layout>
    <HeroSection />
    <StatsSection />
    <HowItWorksSection />
    <FeaturedRolesSection />
    <TestimonialsSection />
    <CTASection />
  </Layout>
);

export default Index;
