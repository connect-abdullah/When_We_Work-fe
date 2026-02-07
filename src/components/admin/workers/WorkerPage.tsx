"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PageHeader, Pagination } from "@/components/ui";
import {
  FilterBar,
  formatDate,
  InsightsCard,
  WorkerEditModal,
  WorkerTable,
  WorkerViewModal,
} from "@/components/admin/workers";
import { CustomerInsightsData } from "@/constants/customers";
import { Download, Plus } from "lucide-react";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "@/lib/api/users";
import { EmploymentType, UserGetSchema, UserRoleEnum , UserUpdate } from "@/lib/api/users/schema";

function userToWorker(u: UserGetSchema): UserGetSchema {
  return {
    id: u.id,
    first_name: u.first_name,
    last_name: u.last_name,
    email: u.email,
    phone: u.phone,
    address: u.address ?? null,
    emergency_contact: u.emergency_contact ?? null,
    photo: u.photo ?? null,
    availability: u.availability ?? true,
    gender: u.gender,
    employment_type: u.employment_type ?? EmploymentType.full_time,
    user_role: u.user_role,
    worker_roles: u.worker_roles ?? null,
    remarks: u.remarks ?? null,
  };
}

function getNewWorkersCount(_workers: UserGetSchema[]): number {
  return 0;
}

export default function WorkersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedWorker, setSelectedWorker] =
    useState<UserGetSchema | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [workers, setWorkers] = useState<UserGetSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const fetchWorkers = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getUsers();
      const workersOnly = (list ?? []).filter(
        (u) => u.user_role === UserRoleEnum.worker,
      );
      setWorkers(workersOnly.map(userToWorker));
    } catch {
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const handleViewWorker = (worker: UserGetSchema) => {
    setSelectedWorker(worker);
    setIsViewModalOpen(true);
  };

  const handleEditWorker = (worker: UserGetSchema) => {
    setSelectedWorker(worker);
    setIsEditModalOpen(true);
  };

  const handleDeleteWorker = async (worker: UserGetSchema) => {
    const workerName = `${worker.first_name} ${worker.last_name}`.trim();
    if (!window.confirm(`Are you sure you want to delete ${workerName}?`)) {
      return;
    }
    try {
      await deleteUser(worker.id);
      await fetchWorkers();
      if (selectedWorker?.id === worker.id) {
        setIsViewModalOpen(false);
        setSelectedWorker(null);
      }
    } catch {
      // Error handled by API layer / could toast here
    }
  };

  const handleSaveWorker = async (workerData: Partial<UserUpdate>) => {
    try {
      if (isEditModalOpen && selectedWorker) {
        await updateUser(selectedWorker.id, {
          first_name: workerData.first_name,
          last_name: workerData.last_name,
          email: workerData.email,
          phone: workerData.phone,
          address: workerData.address ?? null,
          emergency_contact: workerData.emergency_contact ?? null,
          photo: workerData.photo ?? null,
          gender: workerData.gender,
          availability: workerData.availability,
          employment_type: workerData.employment_type ?? null,
          user_role: UserRoleEnum.worker,
          worker_roles: workerData.worker_roles ?? null,
          remarks: workerData.remarks ?? null,
        });
      } else {
        await createUser({
          first_name: workerData.first_name ?? "",
          last_name: workerData.last_name ?? "",
          email: workerData.email ?? "",
          phone: workerData.phone ?? "",
          address: workerData.address ?? null,
          emergency_contact: workerData.emergency_contact ?? null,
          photo: workerData.photo ?? null,
          gender: workerData.gender!,
          availability: workerData.availability ?? true,
          employment_type: workerData.employment_type ?? null,
          user_role: UserRoleEnum.worker,
          worker_roles: workerData.worker_roles ?? null,
          remarks: workerData.remarks ?? null,
        });
      }
      await fetchWorkers();
      setIsEditModalOpen(false);
      setIsAddModalOpen(false);
      setSelectedWorker(null);
    } catch {
      // Error handled by API layer
    }
  };

  const filteredWorkers = workers.filter((worker) => {
    const fullName =
      `${worker.first_name} ${worker.last_name}`.trim().toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (worker.phone || "").includes(searchTerm) ||
      (worker.address || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (worker.emergency_contact || "").includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "available" && (worker.availability ?? true)) ||
      (statusFilter === "unavailable" && !(worker.availability ?? true));
    return matchesSearch && matchesStatus;
  });

  const sortedWorkers = [...filteredWorkers].sort((a, b) => {
    switch (sortBy) {
      case "name": {
        const nameA = `${a.first_name} ${a.last_name}`.trim();
        const nameB = `${b.first_name} ${b.last_name}`.trim();
        return nameA.localeCompare(nameB);
      }
      case "joinDate":
        return 0;
      case "rating":
        return 0;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedWorkers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWorkers = sortedWorkers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleExport = () => {
    return;
  };

  const computedInsightsData = useMemo(() => {
    if (!isClient) {
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
            value: workers.length.toLocaleString(),
          };
        case "New Customers":
          return {
            ...insight,
            title: "New Workers",
            value: getNewWorkersCount(workers).toLocaleString(),
          };
        default:
          return insight;
      }
    });
  }, [workers, isClient]);

  return (
    <div className="flex flex-col w-full h-full pt-4 px-2 sm:px-4 overflow-y-auto">
      <PageHeader
        title="Workers"
        description="Manage and view your workers"
        button={{
          label: "Add Worker",
          icon: Plus,
          onClick: () => setIsAddModalOpen(true),
        }}
      />

      <div className="grid grid-cols-2 mt-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 px-2 sm:px-4 mb-3">
        <InsightsCard insights={computedInsightsData} />
      </div>

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

      <div className="px-2 sm:px-4 pb-4">
        <div className="bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden">
          {loading ? (
            <div className="text-center py-16 text-gray-500">
              Loading workers...
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      <WorkerViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        customer={selectedWorker}
      />

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
