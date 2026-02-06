import { useParams } from "react-router-dom";
import { MapPin, Download, ExternalLink, Star, Briefcase, GraduationCap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { sampleCandidates } from "@/data/sampleData";

const CandidateProfile = () => {
  const { id } = useParams();
  const candidate = sampleCandidates.find((c) => c.id === id) || sampleCandidates[0];

  const availabilityColor =
    candidate.availability === "Available" ? "bg-green-100 text-green-700" :
    candidate.availability === "Open to offers" ? "bg-amber-100 text-amber-700" :
    "bg-red-100 text-red-700";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {candidate.avatar}
                  </div>
                  <div className="flex-1">
                    <h1 className="font-display text-2xl font-bold text-foreground">{candidate.name}</h1>
                    <p className="text-muted-foreground">{candidate.title}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {candidate.location}
                      </span>
                      <Badge className={availabilityColor}>{candidate.availability}</Badge>
                      <span className="flex items-center gap-1 text-sm text-accent">
                        <Star className="h-3.5 w-3.5 fill-accent" /> {candidate.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button className="bg-accent text-accent-foreground hover:bg-gold-dark">
                    <Download className="mr-2 h-4 w-4" /> Download Resume
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" /> Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-lg">
                  <Briefcase className="h-5 w-5 text-primary" /> Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidate.experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-accent after:absolute after:left-[3px] after:top-4 after:h-full after:w-0.5 after:bg-border last:after:hidden">
                    <h4 className="font-sans text-sm font-semibold text-foreground">{exp.role}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{exp.company}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {exp.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-lg">
                  <GraduationCap className="h-5 w-5 text-primary" /> Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {candidate.education.map((edu, i) => (
                  <div key={i} className="flex items-start justify-between rounded-lg border border-border p-3">
                    <div>
                      <div className="font-sans text-sm font-semibold text-foreground">{edu.degree}</div>
                      <div className="text-xs text-muted-foreground">{edu.institution}</div>
                    </div>
                    <Badge variant="secondary">{edu.year}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Skills & Expertise</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="font-display text-lg">Quick Stats</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium text-foreground">{candidate.experience.length} roles</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Skills</span>
                  <span className="font-medium text-foreground">{candidate.skills.length} skills</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="flex items-center gap-1 font-medium text-foreground">
                    <Star className="h-3 w-3 fill-accent text-accent" /> {candidate.rating}/5
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CandidateProfile;
