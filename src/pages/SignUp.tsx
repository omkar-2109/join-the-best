import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type ExperienceType = "fresher" | "experienced" | "career-break";

interface WorkEntry {
  companyName: string; jobTitle: string; startDate: string; endDate: string;
  currentlyWorking: boolean; hrEmail: string; hrPhone: string; hrLinkedIn: string;
}

const emptyWork: WorkEntry = {
  companyName: "", jobTitle: "", startDate: "", endDate: "",
  currentlyWorking: false, hrEmail: "", hrPhone: "", hrLinkedIn: "",
};

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  // Step 1
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Step 2
  const [experienceType, setExperienceType] = useState<ExperienceType>("fresher");
  const [workHistory, setWorkHistory] = useState<WorkEntry[]>([{ ...emptyWork }]);
  const [qualification, setQualification] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [internshipExp, setInternshipExp] = useState("");
  const [skills, setSkills] = useState("");
  const [lastCompany, setLastCompany] = useState("");
  const [lastWorkingDate, setLastWorkingDate] = useState("");
  const [gapReason, setGapReason] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Step 3
  const [preferredRoles, setPreferredRoles] = useState("");
  const [preferredLocations, setPreferredLocations] = useState("");
  const [salaryExpectation, setSalaryExpectation] = useState("");

  const addWork = () => setWorkHistory((prev) => [...prev, { ...emptyWork }]);
  const removeWork = (i: number) => setWorkHistory((prev) => prev.filter((_, idx) => idx !== i));
  const updateWork = (i: number, field: keyof WorkEntry, value: any) => {
    setWorkHistory((prev) => prev.map((w, idx) => idx === i ? { ...w, [field]: value } : w));
  };

  const splitComma = (v: string) => v.split(",").map((s) => s.trim()).filter(Boolean);

  const handleComplete = async () => {
    if (!email || !password || !firstName) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const { error: signUpError } = await signUp(email, password);
      if (signUpError) throw signUpError;

      // Wait briefly for session to be established
      await new Promise((r) => setTimeout(r, 1000));

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Registration failed");

      // Upload resume if provided
      let resumeFileName = "";
      if (resumeFile) {
        const filePath = `${user.id}/${resumeFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(filePath, resumeFile);
        if (!uploadError) resumeFileName = resumeFile.name;
      }

      // Create candidate profile
      const { error: profileError } = await supabase
        .from("candidate_profiles")
        .insert({
          user_id: user.id,
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          experience_type: experienceType,
          experience_years: experienceType === "fresher" ? 0 : 1,
          preferred_locations: splitComma(preferredLocations),
          preferred_roles: splitComma(preferredRoles),
          salary_expectation: salaryExpectation,
          skills: splitComma(skills),
          resume_file_name: resumeFileName,
          qualification: experienceType === "fresher" ? qualification : null,
          passing_year: experienceType === "fresher" ? passingYear : null,
          internship_experience: experienceType === "fresher" ? internshipExp : null,
          work_history: experienceType === "experienced" ? workHistory : [],
          last_company: experienceType === "career-break" ? lastCompany : null,
          last_working_date: experienceType === "career-break" ? lastWorkingDate : null,
          gap_reason: experienceType === "career-break" ? gapReason : null,
        } as any);

      if (profileError) throw profileError;

      toast.success("Account created successfully!");
      navigate("/seeker-dashboard");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src="/favicon.png" alt="BBS Logo" className="h-10 w-10 rounded-lg" />
            <span className="font-display text-xl font-bold text-foreground">BBS</span>
          </Link>
        </div>

        <div className="mb-6 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${step >= s ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
              {s}
            </div>
          ))}
        </div>

        <Card className="shadow-premium">
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
                    <Input placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="+91 XXXXX XXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
                      <button key={t} onClick={() => setExperienceType(t)}
                        className={`rounded-lg border p-3 text-center text-xs font-medium capitalize transition-all ${experienceType === t ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}>
                        {t === "career-break" ? "Career Break" : t}
                      </button>
                    ))}
                  </div>
                </div>

                {experienceType === "fresher" && (
                  <>
                    <div className="space-y-2">
                      <Label>Highest Qualification</Label>
                      <Input placeholder="e.g., B.Tech Computer Science" value={qualification} onChange={(e) => setQualification(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Passing Year</Label>
                      <Input placeholder="2024" value={passingYear} onChange={(e) => setPassingYear(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Internship Experience (optional)</Label>
                      <Textarea placeholder="Describe any internship experience..." rows={2} value={internshipExp} onChange={(e) => setInternshipExp(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <Input placeholder="React, Python, SQL (comma-separated)" value={skills} onChange={(e) => setSkills(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Resume Upload</Label>
                      <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)} />
                    </div>
                  </>
                )}

                {experienceType === "experienced" && (
                  <>
                    {workHistory.map((w, i) => (
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
                            <Input placeholder="Acme Inc." value={w.companyName} onChange={(e) => updateWork(i, "companyName", e.target.value)} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Job Title</Label>
                            <Input placeholder="Software Engineer" value={w.jobTitle} onChange={(e) => updateWork(i, "jobTitle", e.target.value)} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">Start Date</Label>
                            <Input type="month" value={w.startDate} onChange={(e) => updateWork(i, "startDate", e.target.value)} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">End Date</Label>
                            <Input type="month" value={w.endDate} onChange={(e) => updateWork(i, "endDate", e.target.value)} />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">HR Email (required)</Label>
                          <Input type="email" placeholder="hr@company.com" value={w.hrEmail} onChange={(e) => updateWork(i, "hrEmail", e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs">HR Phone</Label>
                            <Input placeholder="+91 XXXXX XXXXX" value={w.hrPhone} onChange={(e) => updateWork(i, "hrPhone", e.target.value)} />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">HR LinkedIn</Label>
                            <Input placeholder="linkedin.com/in/..." value={w.hrLinkedIn} onChange={(e) => updateWork(i, "hrLinkedIn", e.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addWork} className="w-full">
                      <Plus className="mr-2 h-3 w-3" /> Add Another Employer
                    </Button>
                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <Input placeholder="React, Python, SQL (comma-separated)" value={skills} onChange={(e) => setSkills(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Resume Upload</Label>
                      <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)} />
                    </div>
                  </>
                )}

                {experienceType === "career-break" && (
                  <>
                    <div className="space-y-2">
                      <Label>Last Company Name</Label>
                      <Input placeholder="Previous employer" value={lastCompany} onChange={(e) => setLastCompany(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Working Date</Label>
                      <Input type="month" value={lastWorkingDate} onChange={(e) => setLastWorkingDate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Reason for Gap</Label>
                      <Select value={gapReason} onValueChange={setGapReason}>
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
                      <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)} />
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

          {step === 3 && (
            <>
              <CardHeader className="text-center">
                <CardTitle className="font-display text-2xl">Preferences</CardTitle>
                <CardDescription>Step 3: What are you looking for?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Preferred Roles</Label>
                  <Input placeholder="Software Engineer, Data Analyst (comma-separated)" value={preferredRoles} onChange={(e) => setPreferredRoles(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Preferred Locations</Label>
                  <Input placeholder="Mumbai, Bangalore, Remote (comma-separated)" value={preferredLocations} onChange={(e) => setPreferredLocations(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Salary Expectation</Label>
                  <Input placeholder="₹8-12 LPA" value={salaryExpectation} onChange={(e) => setSalaryExpectation(e.target.value)} />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                  <Button className="flex-1 bg-accent text-accent-foreground hover:bg-gold-dark" onClick={handleComplete} disabled={loading}>
                    {loading ? "Creating Account..." : "Complete Registration"}
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
