export interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logo: string;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  type: "Remote" | "Onsite" | "Hybrid";
  experience: string;
  postedAt: string;
  recruiter?: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface JobFilters {
  location?: string;
  jobType?: string;
  experienceLevel?: string;
  companyType?: string;
}
