import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Plus, Trash2, CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";

interface WorkEntry {
  companyName: string;
  field: string;
  hrName: string;
  hrPhone: string;
}

const emptyWork: WorkEntry = { companyName: "", field: "", hrName: "", hrPhone: "" };

const qualificationOptions = ["10th", "12th", "Diploma", "Graduate", "Post Graduate", "PhD"];

const roleOptions = [
  "Software Developer", "Data Analyst", "Marketing", "Sales", "HR",
  "Operations", "Finance", "Customer Support", "Design", "Content Writing",
  "Business Development", "Project Management", "QA/Testing", "DevOps",
  "Product Management", "Consulting", "Teaching/Training", "Healthcare",
  "Legal", "Logistics",
];

const CompleteProfile = () => {
  const { user, loading: authLoading, candidateProfileId } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Personal
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [dob, setDob] = useState<Date>();
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState("");

  // Education
  const [qualification, setQualification] = useState("");
  const [additionalCourses, setAdditionalCourses] = useState("");

  // Experience
  const [experienceType, setExperienceType] = useState<"fresher" | "experienced">("fresher");
  const [workHistory, setWorkHistory] = useState<WorkEntry[]>([{ ...emptyWork }]);

  // CV
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Job roles
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [otherRole, setOtherRole] = useState("");
  const [rolesOpen, setRolesOpen] = useState(false);

  const addWork = () => setWorkHistory((prev) => [...prev, { ...emptyWork }]);
  const removeWork = (i: number) => setWorkHistory((prev) => prev.filter((_, idx) => idx !== i));
  const updateWork = (i: number, field: keyof WorkEntry, value: string) => {
    setWorkHistory((prev) => prev.map((w, idx) => (idx === i ? { ...w, [field]: value } : w)));
  };

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const addOtherRole = () => {
    const trimmed = otherRole.trim();
    if (trimmed && !selectedRoles.includes(trimmed)) {
      setSelectedRoles((prev) => [...prev, trimmed]);
      setOtherRole("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      toast.error("Full Name and Contact No are required");
      return;
    }
    if (!qualification) {
      toast.error("Please select your highest qualification");
      return;
    }
    if (selectedRoles.length === 0) {
      toast.error("Please select at least one interested job role");
      return;
    }

    setLoading(true);
    try {
      let resumeFileName = "";
      if (resumeFile && user) {
        const filePath = `${user.id}/${resumeFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(filePath, resumeFile);
        if (uploadError) throw uploadError;
        resumeFileName = resumeFile.name;
      }

      const { error } = await supabase.from("candidate_profiles").insert({
        user_id: user!.id,
        name: fullName.trim(),
        email: user!.email || "",
        phone: phone.trim(),
        alt_phone: altPhone.trim(),
        dob: dob ? format(dob, "yyyy-MM-dd") : "",
        preferred_locations: location.trim() ? [location.trim()] : [],
        pincode: pincode.trim(),
        qualification,
        additional_courses: additionalCourses.trim(),
        experience_type: experienceType,
        experience_years: experienceType === "fresher" ? 0 : 1,
        field_of_work: experienceType === "experienced" ? workHistory[0]?.field || "" : "",
        hr_name: experienceType === "experienced" ? workHistory[0]?.hrName || "" : "",
        work_history: experienceType === "experienced" ? workHistory : [],
        preferred_roles: selectedRoles,
        resume_file_name: resumeFileName,
        skills: [],
        salary_expectation: "",
      } as any);

      if (error) throw error;
      toast.success("Profile completed successfully!");
      // Force reload to update candidateProfileId in auth context
      window.location.href = "/seeker-dashboard";
    } catch (err: any) {
      toast.error(err.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <Layout><div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading...</div></Layout>;
  if (!user) return <Navigate to="/login" />;
  if (candidateProfileId) return <Navigate to="/seeker-dashboard" />;

  return (
    <Layout>
      <section className="gradient-navy py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-2xl font-bold text-primary-foreground">Complete Your Profile</h1>
          <p className="text-sm text-primary-foreground/70">Fill in your details to start applying for jobs.</p>
        </div>
      </section>

      <div className="container mx-auto max-w-2xl px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-display text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Contact No *</Label>
                  <Input type="tel" placeholder="+91 XXXXX XXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Alternate No</Label>
                  <Input type="tel" placeholder="+91 XXXXX XXXXX" value={altPhone} onChange={(e) => setAltPhone(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={user?.email || ""} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dob && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dob ? format(dob, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      fromYear={1950}
                      toYear={new Date().getFullYear()}
                      selected={dob}
                      onSelect={setDob}
                      disabled={(date) => date > new Date() || date < new Date("1950-01-01")}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input placeholder="City, State" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Pincode</Label>
                  <Input placeholder="400001" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-display text-lg">Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Highest Qualification *</Label>
                <Select value={qualification} onValueChange={setQualification}>
                  <SelectTrigger><SelectValue placeholder="Select qualification" /></SelectTrigger>
                  <SelectContent>
                    {qualificationOptions.map((q) => (
                      <SelectItem key={q} value={q}>{q}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Additional Courses / Certifications</Label>
                <Input placeholder="e.g., AWS Certified, Digital Marketing Course" value={additionalCourses} onChange={(e) => setAdditionalCourses(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Professional Experience */}
          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-display text-lg">Professional Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Experience Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  {(["fresher", "experienced"] as const).map((t) => (
                    <button key={t} type="button" onClick={() => setExperienceType(t)}
                      className={`rounded-lg border p-3 text-center text-sm font-medium capitalize transition-all ${experienceType === t ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {experienceType === "experienced" && (
                <>
                  {workHistory.map((w, i) => (
                    <div key={i} className="space-y-3 rounded-lg border border-border p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">Experience {i + 1}</span>
                        {workHistory.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeWork(i)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Which Field</Label>
                        <Input placeholder="e.g., IT, Marketing, Finance" value={w.field} onChange={(e) => updateWork(i, "field", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Company Name</Label>
                        <Input placeholder="Company name" value={w.companyName} onChange={(e) => updateWork(i, "companyName", e.target.value)} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-xs">HR Name</Label>
                          <Input placeholder="HR contact name" value={w.hrName} onChange={(e) => updateWork(i, "hrName", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">HR Contact No</Label>
                          <Input type="tel" placeholder="+91 XXXXX XXXXX" value={w.hrPhone} onChange={(e) => updateWork(i, "hrPhone", e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addWork} className="w-full">
                    <Plus className="mr-2 h-3 w-3" /> Add More Experience
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* CV Upload */}
          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-display text-lg">Resume / CV Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)} />
              <p className="mt-1 text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX</p>
            </CardContent>
          </Card>

          {/* Interested Job Roles */}
          <Card className="shadow-premium">
            <CardHeader>
              <CardTitle className="font-display text-lg">Interested Job Roles *</CardTitle>
              <CardDescription>Select roles you're interested in. You can also add custom roles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedRoles.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedRoles.map((role) => (
                    <Badge key={role} variant="secondary" className="gap-1 pr-1">
                      {role}
                      <button type="button" onClick={() => toggleRole(role)} className="ml-1 rounded-full hover:bg-muted p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <Popover open={rolesOpen} onOpenChange={setRolesOpen}>
                <PopoverTrigger asChild>
                  <Button type="button" variant="outline" className="w-full justify-start text-muted-foreground">
                    {selectedRoles.length > 0 ? `${selectedRoles.length} role(s) selected` : "Select job roles..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 max-h-64 overflow-y-auto p-3 pointer-events-auto" align="start">
                  <div className="space-y-2">
                    {roleOptions.map((role) => (
                      <label key={role} className="flex items-center gap-2 cursor-pointer text-sm hover:bg-secondary rounded px-2 py-1">
                        <Checkbox checked={selectedRoles.includes(role)} onCheckedChange={() => toggleRole(role)} />
                        {role}
                      </label>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <div className="flex gap-2">
                <Input placeholder="Other role (type and add)" value={otherRole} onChange={(e) => setOtherRole(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addOtherRole(); } }} />
                <Button type="button" variant="outline" size="sm" onClick={addOtherRole}>Add</Button>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-gold-dark text-lg py-6" disabled={loading}>
            {loading ? "Saving Profile..." : "Complete Profile & Continue"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CompleteProfile;
