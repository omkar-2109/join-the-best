import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ExperienceType, WorkHistory } from "@/data/store";

const emptyWork: WorkHistory = {
  companyName: "", jobTitle: "", startDate: "", endDate: "",
  currentlyWorking: false, hrEmail: "", hrPhone: "", hrLinkedIn: "",
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [experienceType, setExperienceType] = useState<ExperienceType>("fresher");
  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([{ ...emptyWork }]);

  const addWork = () => setWorkHistory((prev) => [...prev, { ...emptyWork }]);
  const removeWork = (i: number) => setWorkHistory((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src="/favicon.png" alt="BBS Logo" className="h-10 w-10 rounded-lg" />
            <span className="font-display text-xl font-bold text-foreground">BBS</span>
          </Link>
        </div>

        {/* Step indicators */}
        <div className="mb-6 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${step >= s ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
              {s}
            </div>
          ))}
        </div>

        <Card className="shadow-premium">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="font-display text-2xl">Create Account</CardTitle>
                <CardDescription>Step 1: Basic Information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Create a password" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-gold-dark" onClick={() => setStep(2)}>
                  Continue
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
                </p>
              </CardContent>
            </>
          )}

          {/* Step 2: Experience */}
          {step === 2 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="font-display text-2xl">Your Experience</CardTitle>
                <CardDescription>Step 2: Tell us about your background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Experience Type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["fresher", "experienced", "career-break"] as ExperienceType[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setExperienceType(t)}
                        className={`rounded-lg border p-3 text-center text-xs font-medium capitalize transition-all ${experienceType === t ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}
                      >
                        {t === "career-break" ? "Career Break" : t}
                      </button>
                    ))}
                  </div>
                </div>

                {experienceType === "fresher" && (
                  <>
                    <div className="space-y-2">
                      <Label>Highest Qualification</Label>
                      <Input placeholder="e.g., B.Tech Computer Science" />
                    </div>
                    <div className="space-y-2">
                      <Label>Passing Year</Label>
                      <Input placeholder="2024" />
                    </div>
                    <div className="space-y-2">
                      <Label>Internship Experience (optional)</Label>
                      <Textarea placeholder="Describe any internship experience..." rows={2} />
                    </div>
                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <Input placeholder="e.g., React, Python, SQL (comma-separated)" />
                    </div>
                    <div className="space-y-2">
                      <Label>Resume Upload</Label>
                      <Input type="file" accept=".pdf,.doc,.docx" />
                    </div>
                  </>
                )}

                {experienceType === "experienced" && (
                  <>
                    {workHistory.map((_, i) => (
                      <div key={i} className="space-y-3 rounded-lg border border-border p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">Company {i + 1}</span>
                          {workHistory.length > 1 && (
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeWork(i)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Company Name</Label>
                            <Input placeholder="Acme Inc." />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Job Title</Label>
                            <Input placeholder="Software Engineer" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Start Date</Label>
                            <Input type="month" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">End Date</Label>
                            <Input type="month" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">HR Email (required)</Label>
                          <Input type="email" placeholder="hr@company.com" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">HR Phone</Label>
                            <Input placeholder="+91 XXXXX XXXXX" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">HR LinkedIn</Label>
                            <Input placeholder="linkedin.com/in/..." />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addWork} className="w-full">
                      <Plus className="mr-2 h-3 w-3" /> Add Another Employer
                    </Button>
                    <div className="space-y-2">
                      <Label>Resume Upload</Label>
                      <Input type="file" accept=".pdf,.doc,.docx" />
                    </div>
                  </>
                )}

                {experienceType === "career-break" && (
                  <>
                    <div className="space-y-2">
                      <Label>Last Company Name</Label>
                      <Input placeholder="Previous employer" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Working Date</Label>
                      <Input type="month" />
                    </div>
                    <div className="space-y-2">
                      <Label>Reason for Gap</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select reason" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="higher-studies">Higher Studies</SelectItem>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="family">Family</SelectItem>
                          <SelectItem value="freelancing">Freelancing</SelectItem>
                          <SelectItem value="startup">Startup Attempt</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Resume Upload</Label>
                      <Input type="file" accept=".pdf,.doc,.docx" />
                    </div>
                  </>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                  <Button className="flex-1 bg-accent text-accent-foreground hover:bg-gold-dark" onClick={() => setStep(3)}>Continue</Button>
                </div>
              </CardContent>
            </>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="font-display text-2xl">Preferences</CardTitle>
                <CardDescription>Step 3: What are you looking for?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Preferred Roles</Label>
                  <Input placeholder="e.g., Software Engineer, Data Analyst (comma-separated)" />
                </div>
                <div className="space-y-2">
                  <Label>Preferred Locations</Label>
                  <Input placeholder="e.g., Mumbai, Bangalore, Remote (comma-separated)" />
                </div>
                <div className="space-y-2">
                  <Label>Salary Expectation</Label>
                  <Input placeholder="e.g., ₹8-12 LPA" />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                  <Button className="flex-1 bg-accent text-accent-foreground hover:bg-gold-dark">
                    Complete Registration
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
