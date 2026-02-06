export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship";
  salary: string;
  experience: string;
  industry: string;
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  availability: "Available" | "Open to offers" | "Not available";
  skills: string[];
  experience: { role: string; company: string; period: string; description: string }[];
  education: { degree: string; institution: string; year: string }[];
  rating: number;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  founded: string;
  about: string;
  culture: string[];
  benefits: string[];
  openPositions: number;
}

export interface Application {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  position: string;
  status: "Applied" | "Screening" | "Interview" | "Offer" | "Hired" | "Rejected";
  date: string;
  rating: number;
}

export const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "TechVision Global",
    companyLogo: "TV",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150,000 - $200,000",
    experience: "5+ years",
    industry: "Technology",
    postedDate: "2 days ago",
    description: "We are looking for a Senior Software Engineer to join our platform team. You'll be responsible for building scalable microservices and leading technical decisions across the organization.",
    requirements: ["5+ years of experience in software development", "Proficiency in TypeScript, Python, or Go", "Experience with cloud platforms (AWS/GCP/Azure)", "Strong understanding of distributed systems"],
    responsibilities: ["Design and implement scalable backend services", "Mentor junior engineers", "Lead technical design reviews", "Collaborate with product and design teams"],
    benefits: ["Competitive salary & equity", "Remote-first culture", "Health & wellness stipend", "Unlimited PTO"],
  },
  {
    id: "2",
    title: "Product Marketing Manager",
    company: "BrandForge Inc.",
    companyLogo: "BF",
    location: "London, UK",
    type: "Full-time",
    salary: "£75,000 - £95,000",
    experience: "3-5 years",
    industry: "Marketing",
    postedDate: "5 days ago",
    description: "Join our marketing team to drive go-to-market strategies for our enterprise SaaS products. You'll work closely with sales, product, and design teams.",
    requirements: ["3-5 years in product marketing or related field", "Experience with B2B SaaS products", "Strong analytical and communication skills", "MBA preferred"],
    responsibilities: ["Develop positioning and messaging", "Create sales enablement materials", "Analyze market trends and competitors", "Plan and execute product launches"],
    benefits: ["Competitive base + bonus", "Central London office", "Learning & development budget", "25 days holiday"],
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "DesignFlow Studio",
    companyLogo: "DF",
    location: "Berlin, Germany",
    type: "Remote",
    salary: "€60,000 - €80,000",
    experience: "2-4 years",
    industry: "Design",
    postedDate: "1 week ago",
    description: "We're seeking a talented UX/UI Designer to craft beautiful, user-centered digital experiences for our diverse client portfolio.",
    requirements: ["2-4 years of UX/UI design experience", "Proficiency in Figma and prototyping tools", "Strong portfolio showcasing web and mobile projects", "Understanding of accessibility standards"],
    responsibilities: ["Create wireframes, prototypes, and high-fidelity designs", "Conduct user research and usability testing", "Collaborate with developers on implementation", "Maintain and evolve design systems"],
    benefits: ["Fully remote", "Flexible hours", "Annual retreat", "Equipment budget"],
  },
  {
    id: "4",
    title: "Financial Analyst",
    company: "GlobalFinance Corp",
    companyLogo: "GF",
    location: "Singapore",
    type: "Full-time",
    salary: "SGD 80,000 - 110,000",
    experience: "2-3 years",
    industry: "Finance",
    postedDate: "3 days ago",
    description: "Join our APAC finance team to provide strategic financial analysis and support business decision-making across the region.",
    requirements: ["2-3 years in financial analysis or consulting", "Advanced Excel and financial modeling skills", "CFA or CPA certification preferred", "Bachelor's in Finance or related field"],
    responsibilities: ["Build financial models and forecasts", "Prepare monthly reporting packages", "Support M&A due diligence", "Analyze investment opportunities"],
    benefits: ["Performance bonus", "Health insurance", "Professional development", "Central CBD office"],
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "AI Dynamics",
    companyLogo: "AI",
    location: "Toronto, Canada",
    type: "Full-time",
    salary: "CAD 120,000 - 160,000",
    experience: "3+ years",
    industry: "Technology",
    postedDate: "1 day ago",
    description: "Build ML models and data pipelines that power our recommendation engine serving millions of users globally.",
    requirements: ["3+ years in data science or ML engineering", "Strong Python and SQL skills", "Experience with TensorFlow or PyTorch", "MS/PhD in Computer Science or Statistics preferred"],
    responsibilities: ["Develop and deploy ML models", "Design A/B testing frameworks", "Build data pipelines at scale", "Present findings to stakeholders"],
    benefits: ["Competitive salary + RSUs", "Hybrid work", "Conference budget", "Health & dental"],
  },
  {
    id: "6",
    title: "HR Business Partner",
    company: "PeopleFirst Solutions",
    companyLogo: "PF",
    location: "Dubai, UAE",
    type: "Full-time",
    salary: "AED 25,000 - 35,000/mo",
    experience: "5-7 years",
    industry: "Human Resources",
    postedDate: "4 days ago",
    description: "Strategic HRBP role supporting 500+ employees across MENA region with talent management, employee engagement, and organizational development.",
    requirements: ["5-7 years HR experience", "SHRM or CIPD certification", "Experience in multinational environments", "Strong stakeholder management skills"],
    responsibilities: ["Partner with business leaders on people strategy", "Drive employee engagement initiatives", "Manage performance review cycles", "Support talent acquisition and retention"],
    benefits: ["Tax-free salary", "Housing allowance", "Annual flight home", "Medical insurance"],
  },
];

export const sampleCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "SC",
    title: "Senior Full-Stack Developer",
    location: "San Francisco, CA",
    availability: "Open to offers",
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "GraphQL"],
    experience: [
      { role: "Senior Developer", company: "TechCorp", period: "2021 - Present", description: "Led frontend architecture migration to React 18 with TypeScript." },
      { role: "Full-Stack Developer", company: "StartupXYZ", period: "2018 - 2021", description: "Built core platform features serving 100K+ users." },
    ],
    education: [{ degree: "BS Computer Science", institution: "Stanford University", year: "2018" }],
    rating: 4.8,
  },
  {
    id: "2",
    name: "James Mitchell",
    avatar: "JM",
    title: "Product Marketing Lead",
    location: "London, UK",
    availability: "Available",
    skills: ["Go-to-Market Strategy", "Content Marketing", "Analytics", "SEO", "Brand Strategy"],
    experience: [
      { role: "Marketing Lead", company: "SaaS Global", period: "2020 - Present", description: "Drove 3x pipeline growth through integrated marketing campaigns." },
      { role: "Marketing Manager", company: "DigiAgency", period: "2017 - 2020", description: "Managed $2M annual marketing budget for enterprise clients." },
    ],
    education: [{ degree: "MBA Marketing", institution: "London Business School", year: "2017" }],
    rating: 4.5,
  },
  {
    id: "3",
    name: "Priya Sharma",
    avatar: "PS",
    title: "Data Scientist",
    location: "Bangalore, India",
    availability: "Open to offers",
    skills: ["Python", "TensorFlow", "SQL", "Spark", "NLP", "Computer Vision"],
    experience: [
      { role: "Senior Data Scientist", company: "DataMinds", period: "2022 - Present", description: "Built recommendation engine improving engagement by 40%." },
      { role: "Data Analyst", company: "AnalyticsPro", period: "2019 - 2022", description: "Developed predictive models for customer churn analysis." },
    ],
    education: [{ degree: "MS Data Science", institution: "IIT Bombay", year: "2019" }],
    rating: 4.7,
  },
  {
    id: "4",
    name: "Marcus Weber",
    avatar: "MW",
    title: "UX Design Director",
    location: "Berlin, Germany",
    availability: "Not available",
    skills: ["Figma", "User Research", "Design Systems", "Prototyping", "Accessibility"],
    experience: [
      { role: "Design Director", company: "DesignLab Berlin", period: "2020 - Present", description: "Leading a team of 12 designers across 3 product lines." },
      { role: "Senior UX Designer", company: "CreativeFlow", period: "2016 - 2020", description: "Redesigned core product increasing NPS from 32 to 68." },
    ],
    education: [{ degree: "MA Interaction Design", institution: "Universität der Künste Berlin", year: "2016" }],
    rating: 4.9,
  },
];

export const sampleCompanies: Company[] = [
  {
    id: "1",
    name: "TechVision Global",
    logo: "TV",
    industry: "Technology",
    size: "1,000-5,000 employees",
    location: "San Francisco, CA",
    founded: "2015",
    about: "TechVision Global is a leading enterprise software company building the next generation of cloud infrastructure tools. Our platform serves over 10,000 businesses worldwide.",
    culture: ["Innovation-driven", "Remote-first", "Diversity & inclusion", "Continuous learning"],
    benefits: ["Equity packages", "Unlimited PTO", "Health & wellness", "Home office stipend", "Learning budget"],
    openPositions: 24,
  },
  {
    id: "2",
    name: "GlobalFinance Corp",
    logo: "GF",
    industry: "Financial Services",
    size: "10,000+ employees",
    location: "Singapore",
    founded: "1998",
    about: "A multinational financial services firm providing investment banking, wealth management, and advisory services across 40+ countries in APAC, EMEA, and Americas.",
    culture: ["Excellence", "Integrity", "Client-first", "Global perspective"],
    benefits: ["Competitive bonus", "Relocation support", "Professional certifications", "Gym membership", "Annual retreat"],
    openPositions: 42,
  },
  {
    id: "3",
    name: "DesignFlow Studio",
    logo: "DF",
    industry: "Design & Creative",
    size: "50-200 employees",
    location: "Berlin, Germany",
    founded: "2019",
    about: "A boutique design studio crafting exceptional digital experiences for global brands. We blend strategy, design, and technology to create products people love.",
    culture: ["Creative freedom", "Work-life balance", "Sustainability", "Collaboration"],
    benefits: ["Flexible hours", "Remote work", "Annual retreat", "Equipment budget", "Sabbatical program"],
    openPositions: 8,
  },
  {
    id: "4",
    name: "BrandForge Inc.",
    logo: "BF",
    industry: "Marketing & Advertising",
    size: "200-500 employees",
    location: "London, UK",
    founded: "2012",
    about: "BrandForge helps B2B SaaS companies accelerate growth through data-driven marketing strategies, brand building, and demand generation.",
    culture: ["Data-driven", "Entrepreneurial", "Inclusive", "Results-oriented"],
    benefits: ["Performance bonus", "Learning stipend", "Central office", "Team events", "Mental health support"],
    openPositions: 15,
  },
];

export const sampleApplications: Application[] = [
  { id: "1", candidateName: "Sarah Chen", candidateAvatar: "SC", position: "Senior Software Engineer", status: "Interview", date: "2026-02-04", rating: 4.8 },
  { id: "2", candidateName: "James Mitchell", candidateAvatar: "JM", position: "Product Marketing Manager", status: "Screening", date: "2026-02-03", rating: 4.5 },
  { id: "3", candidateName: "Priya Sharma", candidateAvatar: "PS", position: "Data Scientist", status: "Applied", date: "2026-02-05", rating: 4.7 },
  { id: "4", candidateName: "Marcus Weber", candidateAvatar: "MW", position: "UX/UI Designer", status: "Offer", date: "2026-01-28", rating: 4.9 },
  { id: "5", candidateName: "Emily Rodriguez", candidateAvatar: "ER", position: "Financial Analyst", status: "Interview", date: "2026-02-01", rating: 4.3 },
  { id: "6", candidateName: "David Kim", candidateAvatar: "DK", position: "Senior Software Engineer", status: "Hired", date: "2026-01-20", rating: 4.6 },
  { id: "7", candidateName: "Ana Petrova", candidateAvatar: "AP", position: "HR Business Partner", status: "Screening", date: "2026-02-04", rating: 4.4 },
  { id: "8", candidateName: "Raj Patel", candidateAvatar: "RP", position: "Data Scientist", status: "Rejected", date: "2026-01-25", rating: 3.8 },
];

export const testimonials = [
  {
    name: "Lisa Thompson",
    role: "VP of Engineering, TechVision",
    quote: "BBS helped us hire 15 senior engineers in just 3 months. Their platform streamlined our entire recruitment process.",
    avatar: "LT",
  },
  {
    name: "Ahmed Hassan",
    role: "Job Seeker, Data Science",
    quote: "I found my dream job through BBS within two weeks. The platform made it incredibly easy to connect with top companies.",
    avatar: "AH",
  },
  {
    name: "Maria Santos",
    role: "HR Director, GlobalFinance",
    quote: "The ATS features and candidate tracking tools are world-class. BBS has transformed how we approach talent acquisition.",
    avatar: "MS",
  },
];

export const stats = [
  { label: "Active Jobs", value: "50K+" },
  { label: "Companies", value: "10K+" },
  { label: "Candidates", value: "1M+" },
  { label: "Placements", value: "250K+" },
];
