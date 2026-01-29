export interface Worker {
  id: number;
  name: string;
  image?: string;
  profession: string;
  availabilityStatus: "available" | "unavailable" | "pending";
}

export interface Job {
  id: number;
  name: string;
  jobId: string;
  totalRequired: number;
  acceptedCount: number;
  applicants: Worker[];
}
