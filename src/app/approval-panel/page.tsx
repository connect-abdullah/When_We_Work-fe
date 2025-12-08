"use client";
import React, { useMemo, useState } from "react";
import { Card, PageHeader, SearchInput } from "@/components/ui";
import Sidebar from "@/components/layout/Sidebar";
import { Job, JobSection } from "@/components/approval-panel";

// Mock data - In a real app, this would come from your database/API
const MOCK_JOBS: Job[] = [
  {
    id: 1,
    name: "Senior Frontend Developer",
    jobId: "JOB-001",
    totalRequired: 5,
    acceptedCount: 2,
    applicants: [
      {
        id: 1,
        name: "John Doe",
        profession: "Frontend Developer",
        availabilityStatus: "available",
      },
      {
        id: 2,
        name: "Jane Smith",
        profession: "React Developer",
        availabilityStatus: "available",
      },
      {
        id: 3,
        name: "Mike Johnson",
        profession: "UI/UX Developer",
        availabilityStatus: "unavailable",
      },
    ],
  },
  {
    id: 2,
    name: "Backend Engineer",
    jobId: "JOB-002",
    totalRequired: 3,
    acceptedCount: 1,
    applicants: [
      {
        id: 4,
        name: "Sarah Williams",
        profession: "Node.js Developer",
        availabilityStatus: "available",
      },
      {
        id: 5,
        name: "David Brown",
        profession: "Python Developer",
        availabilityStatus: "unavailable",
      },
    ],
  },
  {
    id: 3,
    name: "Full Stack Developer",
    jobId: "JOB-003",
    totalRequired: 10,
    acceptedCount: 5,
    applicants: [
      {
        id: 6,
        name: "Emily Davis",
        profession: "Full Stack Developer",
        availabilityStatus: "available",
      },
      {
        id: 7,
        name: "Chris Wilson",
        profession: "MERN Stack Developer",
        availabilityStatus: "available",
      },
    ],
  },
];

export default function ApprovalPanelPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filter jobs based on search term
  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) {
      return jobs;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    return jobs.filter(
      (job) =>
        job.name.toLowerCase().includes(searchLower) ||
        job.jobId.toLowerCase().includes(searchLower),
    );
  }, [jobs, searchTerm]);

  const handleAccept = (jobId: number, personId: number) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          // Update the person's status and increment accepted count
          const updatedApplicants = job.applicants.map((applicant) =>
            applicant.id === personId
              ? { ...applicant, availabilityStatus: "available" as const }
              : applicant,
          );

          // Check if this person was already accepted
          const person = job.applicants.find((p) => p.id === personId);
          const wasAlreadyAccepted = person?.availabilityStatus === "available";

          return {
            ...job,
            applicants: updatedApplicants,
            acceptedCount: wasAlreadyAccepted
              ? job.acceptedCount
              : job.acceptedCount + 1,
          };
        }
        return job;
      }),
    );

    // TODO: Make API call to accept the person
    // console.log(`Accepted person ${personId} for job ${jobId}`);
  };

  const handleDecline = (jobId: number, personId: number) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          // Remove the person from applicants
          const updatedApplicants = job.applicants.filter(
            (applicant) => applicant.id !== personId,
          );

          // Check if this person was accepted
          const person = job.applicants.find((p) => p.id === personId);
          const wasAccepted = person?.availabilityStatus === "available";

          return {
            ...job,
            applicants: updatedApplicants,
            acceptedCount: wasAccepted
              ? Math.max(0, job.acceptedCount - 1)
              : job.acceptedCount,
          };
        }
        return job;
      }),
    );

    // TODO: Make API call to decline the person
    // console.log(`Declined person ${personId} for job ${jobId}`);
  };

  return (
    <div className="bg-[#F1F2F7] font-poppins min-h-screen flex flex-row w-full">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div className="flex flex-col w-full h-screen lg:ml-0">
        <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
          <PageHeader
            title="Approval Panel"
            description="Review and manage job applications"
          />

          <div className="px-2 sm:px-4 pb-8 mt-4 space-y-3">
            {/* Search Bar */}
            <Card className="bg-white border border-gray-100" padding="sm">
              <SearchInput
                placeholder="Search jobs by name or ID..."
                value={searchTerm}
                onChange={setSearchTerm}
              />
            </Card>

            {/* Jobs Section */}
            <JobSection
              jobs={filteredJobs}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
