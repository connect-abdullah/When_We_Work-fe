"use client";
import React, { useEffect, useMemo, useState } from "react";
import { PageHeader, Pagination } from "@/components/ui";
import {
  FilterBar,
  formatDate,
  InsightsCard,
  WorkerEditModal,
  WorkerTable,
  WorkerViewModal,
} from "@/components/workers";
import { CustomerInsightsData } from "@/constants/customers";
import { Download, Plus } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

// Worker type definition based on add_worker model
export interface Worker {
  id: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  date_joined: string;
  rating: number;
  is_available: boolean;
  is_freelancer: boolean;
  emergency_contact?: string | null;
  roles: string[];
  remarks?: string | null;
}

// Mock data - using fixed dates to prevent hydration mismatches
const getFixedDate = (daysAgo: number): string => {
  const baseDate = new Date("2024-01-01T00:00:00Z");
  const targetDate = new Date(baseDate);
  targetDate.setDate(targetDate.getDate() - daysAgo);
  return targetDate.toISOString();
};

const MOCK_WORKERS: Worker[] = [
  {
    id: "1",
    first_name: "Sarah",
    middle_name: "Marie",
    last_name: "Johnson",
    email: "sarah.johnson@whenwework.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    date_joined: getFixedDate(60),
    rating: 4.8,
    is_available: true,
    is_freelancer: false,
    emergency_contact: "+1 (555) 987-6543",
    roles: ["Plumber", "Electrician"],
    remarks: "Experienced with commercial projects",
  },
  {
    id: "2",
    first_name: "Michael",
    middle_name: null,
    last_name: "Chen",
    email: "michael.chen@whenwework.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, Los Angeles, CA 90012",
    date_joined: getFixedDate(120),
    rating: 4.9,
    is_available: true,
    is_freelancer: true,
    emergency_contact: "+1 (555) 876-5432",
    roles: ["Carpenter", "General Labor"],
    remarks: "Available on weekends",
  },
  {
    id: "3",
    first_name: "Emily",
    middle_name: "Rose",
    last_name: "Rodriguez",
    email: "emily.rodriguez@whenwework.com",
    phone: "+1 (555) 345-6789",
    address: "789 Elm St, Chicago, IL 60601",
    date_joined: getFixedDate(30),
    rating: 4.7,
    is_available: false,
    is_freelancer: false,
    emergency_contact: "+1 (555) 765-4321",
    roles: ["Painter", "Decorator"],
    remarks: "On leave until next month",
  },
  {
    id: "4",
    first_name: "David",
    middle_name: "Lee",
    last_name: "Kim",
    email: "david.kim@whenwework.com",
    phone: "+1 (555) 456-7890",
    address: "321 Pine Rd, Houston, TX 77001",
    date_joined: getFixedDate(180),
    rating: 4.5,
    is_available: true,
    is_freelancer: true,
    emergency_contact: "+1 (555) 654-3210",
    roles: ["HVAC Technician"],
    remarks: null,
  },
  {
    id: "5",
    first_name: "Jennifer",
    middle_name: null,
    last_name: "Martinez",
    email: "jennifer.martinez@whenwework.com",
    phone: "+1 (555) 567-8901",
    address: "654 Maple Dr, Phoenix, AZ 85001",
    date_joined: getFixedDate(90),
    rating: 4.6,
    is_available: true,
    is_freelancer: false,
    emergency_contact: "+1 (555) 543-2109",
    roles: ["Welder", "Fabricator"],
    remarks: "Certified welder",
  },
];

// Helper function to count new workers (created in the last 24 hours)
// This runs client-side only to avoid hydration mismatches
const getNewWorkersCount = (workers: Worker[]): number => {
  if (typeof window === "undefined") {
    return 0; // Server-side: return 0 to avoid hydration mismatch
  }
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  return workers.filter((worker) => {
    if (!worker.date_joined) {
      return false;
    }
    const joined = new Date(worker.date_joined).getTime();
    return now - joined <= twentyFourHours;
  }).length;
};

export default function WorkersPage() {
  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [workers, setWorkers] = useState<Worker[]>(MOCK_WORKERS);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client-side to avoid hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleViewWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    setIsViewModalOpen(true);
  };

  const handleEditWorker = (worker: Worker) => {
    setSelectedWorker(worker);
    setIsEditModalOpen(true);
  };

  const handleDeleteWorker = (worker: Worker) => {
    const workerName = `${worker.first_name} ${worker.last_name}`.trim();
    if (window.confirm(`Are you sure you want to delete ${workerName}?`)) {
      // Update local state by removing the deleted worker
      setWorkers((prevWorkers) =>
        prevWorkers.filter((w) => w.id !== worker.id)
      );
    }
  };

  const handleSaveWorker = (workerData: Partial<Worker>) => {
    if (isEditModalOpen && selectedWorker) {
      // Update existing worker
      setWorkers((prevWorkers) =>
        prevWorkers.map((w) =>
          w.id === selectedWorker.id
            ? {
                ...w,
                ...workerData,
              }
            : w
        )
      );
    } else {
      // Create new worker - use timestamp only on client-side
      const newWorker: Worker = {
        id:
          typeof window !== "undefined"
            ? Date.now().toString()
            : `temp-${Math.random()}`,
        first_name: workerData.first_name || "",
        middle_name: workerData.middle_name || null,
        last_name: workerData.last_name || "",
        email: workerData.email || "",
        phone: workerData.phone || null,
        address: workerData.address || null,
        date_joined:
          typeof window !== "undefined"
            ? new Date().toISOString()
            : new Date("2024-01-01").toISOString(),
        rating: workerData.rating || 4.0,
        is_available: workerData.is_available ?? true,
        is_freelancer: workerData.is_freelancer ?? false,
        emergency_contact: workerData.emergency_contact || null,
        roles: workerData.roles || [],
        remarks: workerData.remarks || null,
      };
      setWorkers((prevWorkers) => [...prevWorkers, newWorker]);
    }

    // Close modals
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedWorker(null);
  };

  // Filter and search workers
  const filteredWorkers = workers.filter((worker) => {
    const fullName =
      `${worker.first_name} ${worker.middle_name || ""} ${worker.last_name}`
        .trim()
        .toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (worker.phone || "").includes(searchTerm) ||
      (worker.address || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (worker.emergency_contact || "").includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "available" && worker.is_available) ||
      (statusFilter === "unavailable" && !worker.is_available);
    return matchesSearch && matchesStatus;
  });

  // Sort workers
  const sortedWorkers = [...filteredWorkers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        const nameA = `${a.first_name} ${a.last_name}`.trim();
        const nameB = `${b.first_name} ${b.last_name}`.trim();
        return nameA.localeCompare(nameB);
      case "joinDate":
        return (
          new Date(b.date_joined).getTime() - new Date(a.date_joined).getTime()
        );
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedWorkers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWorkers = sortedWorkers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleExport = () => {
    // console.log("Exporting workers...");
  };

  // Compute insights data with dynamic total workers value
  // Only compute on client-side to avoid hydration mismatches
  const computedInsightsData = useMemo(() => {
    if (!isClient) {
      // Return default values during SSR
      return CustomerInsightsData.map((insight) => ({
        ...insight,
        title:
          insight.title === "Total Customers"
            ? "Total Workers"
            : insight.title === "New Customers"
              ? "New Workers"
              : insight.title,
        value: "0",
      }));
    }
    return CustomerInsightsData.map((insight) => {
      switch (insight.title) {
        case "Total Customers":
          return {
            ...insight,
            title: "Total Workers",
            value: workers.length.toLocaleString(), // Format with commas
          };
        case "New Customers":
          return {
            ...insight,
            title: "New Workers",
            value: getNewWorkersCount(workers).toLocaleString(), // Format with commas
          };
        default:
          return insight;
      }
      return insight;
    });
  }, [workers, isClient]);

  return (
    <div className="bg-[#F1F2F7] min-h-screen flex flex-row">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full h-screen overflow-hidden">
        <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
          <PageHeader
            title="Workers"
            description="Manage and view your workers"
            button={{
              label: "Add Worker",
              icon: Plus,
              onClick: () => setIsAddModalOpen(true),
            }}
            onMenuToggle={toggleSidebar}
          />

          {/* Worker Insights Cards */}
          <div className="grid grid-cols-2 mt-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 px-2 sm:px-4 mb-3">
            <InsightsCard insights={computedInsightsData} />
          </div>

          {/* Filters and Search */}
          <FilterBar
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search workers..."
            filters={[
              {
                value: statusFilter,
                onChange: setStatusFilter,
                options: [
                  { value: "all", label: "All Workers" },
                  { value: "available", label: "Available" },
                  { value: "unavailable", label: "Unavailable" },
                ],
                width: "sm:w-32",
              },
            ]}
            sort={{
              value: sortBy,
              onChange: setSortBy,
              options: [
                { value: "name", label: "Sort by Name" },
                { value: "joinDate", label: "Join Date" },
                { value: "rating", label: "Rating" },
              ],
              width: "sm:w-32",
            }}
            actions={[
              {
                label: "Export",
                icon: Download,
                variant: "secondary",
                onClick: () => handleExport(),
              },
            ]}
          />

          {/* Workers Table */}
          <div className="px-2 sm:px-4 pb-4">
            <div className="bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden">
              <WorkerTable
                customers={currentWorkers}
                onView={handleViewWorker}
                onEdit={handleEditWorker}
                onDelete={handleDeleteWorker}
                formatDate={formatDate}
              />
              <div className="px-4 py-3 border-t border-gray-100">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={sortedWorkers.length}
                  itemsPerPage={itemsPerPage}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  onPageChange={handlePageChange}
                  itemLabel="workers"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Worker Modal */}
      <WorkerViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        customer={selectedWorker}
      />

      {/* Edit/Add Worker Modal */}
      <WorkerEditModal
        isOpen={isEditModalOpen || isAddModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setIsAddModalOpen(false);
          setSelectedWorker(null);
        }}
        customer={selectedWorker}
        isEditMode={isEditModalOpen}
        onSave={handleSaveWorker}
      />
    </div>
  );
}
