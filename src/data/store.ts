// LocalStorage-based store for the BBS anonymous recruitment platform
// No sample data — all data is created by admins

export interface Job {
  id: string;
  title: string;
  locations: string[];
  type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship";
  salaryRange: string;
  experienceRange: string;
  urgency: "Urgent" | "Normal";
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  active: boolean;
  internalCompanyIds: string[]; // hidden from candidates
  createdAt: string;
}

export type ExperienceType = "fresher" | "experienced" | "career-break";

export interface WorkHistory {
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  hrEmail: string;
  hrPhone: string;
  hrLinkedIn: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  experienceType: ExperienceType;
  experienceYears: number;
  preferredLocations: string[];
  preferredRoles: string[];
  salaryExpectation: string;
  skills: string[];
  resumeFileName: string;
  // fresher fields
  qualification?: string;
  passingYear?: string;
  internshipExperience?: string;
  // experienced fields
  workHistory?: WorkHistory[];
  // career-break fields
  lastCompany?: string;
  lastWorkingDate?: string;
  gapReason?: string;
  verificationStatus: "pending" | "verified" | "unable";
  createdAt: string;
}

export type ApplicationStatus =
  | "Applied"
  | "Profile Shortlisted"
  | "Submitted to Partner"
  | "Interview Scheduled"
  | "Offer"
  | "Rejected"
  | "On Hold";

export interface CandidateApplication {
  id: string;
  candidateId: string;
  jobId: string;
  status: ApplicationStatus;
  locationPreference: string;
  notes: string; // candidate notes
  internalNotes: string; // admin-only
  appliedAt: string;
  updatedAt: string;
}

// ---- localStorage helpers ----

const KEYS = {
  jobs: "bbs_jobs",
  candidates: "bbs_candidates",
  applications: "bbs_applications",
} as const;

function get<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function set<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// -- Jobs --
export const getJobs = (): Job[] => get<Job>(KEYS.jobs);
export const getActiveJobs = (): Job[] => getJobs().filter((j) => j.active);
export const getJobById = (id: string): Job | undefined => getJobs().find((j) => j.id === id);

export const saveJob = (job: Job) => {
  const jobs = getJobs();
  const idx = jobs.findIndex((j) => j.id === job.id);
  if (idx >= 0) jobs[idx] = job;
  else jobs.push(job);
  set(KEYS.jobs, jobs);
};

export const deleteJob = (id: string) => {
  set(KEYS.jobs, getJobs().filter((j) => j.id !== id));
};

// -- Candidates --
export const getCandidates = (): CandidateProfile[] => get<CandidateProfile>(KEYS.candidates);
export const getCandidateById = (id: string): CandidateProfile | undefined =>
  getCandidates().find((c) => c.id === id);

export const saveCandidate = (c: CandidateProfile) => {
  const all = getCandidates();
  const idx = all.findIndex((x) => x.id === c.id);
  if (idx >= 0) all[idx] = c;
  else all.push(c);
  set(KEYS.candidates, all);
};

// -- Applications --
export const getApplications = (): CandidateApplication[] => get<CandidateApplication>(KEYS.applications);
export const getApplicationsByCandidate = (candidateId: string) =>
  getApplications().filter((a) => a.candidateId === candidateId);
export const getApplicationsByJob = (jobId: string) =>
  getApplications().filter((a) => a.jobId === jobId);

export const saveApplication = (app: CandidateApplication) => {
  const all = getApplications();
  const idx = all.findIndex((a) => a.id === app.id);
  if (idx >= 0) all[idx] = app;
  else all.push(app);
  set(KEYS.applications, all);
};

// -- ID generator --
export const genId = () => crypto.randomUUID();
