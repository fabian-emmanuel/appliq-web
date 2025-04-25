import React, { useState, useMemo, useCallback } from "react";
import { DashboardLayout } from "components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {JobApplication, Status, statuses, StatusHistoryEntry} from "@/types/Applications.ts";
import { StatusUpdateModal } from "components/StatusUpdateModal"; // Import the modal
import { PlusIcon, TableIcon, LayoutGridIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { initialApplications } from "@/stores/Data";
import {ApplicationCard} from "components/ApplicationCard.tsx";

// --- Component ---
export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [sortConfig, setSortConfig] = useState<{ key: keyof JobApplication | 'lastUpdated'; direction: "ascending" | "descending" } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Show 9 cards per page

  // --- Modal State ---
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    appId: string | null;
    newStatus: Status | null;
    company: string;
    position: string;
  }>({ isOpen: false, appId: null, newStatus: null, company: "", position: "" });

  // --- Filtering and Sorting ---
  const filteredApplications = useMemo(() => {
    let filtered = applications.filter(app => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        app.company.toLowerCase().includes(term) ||
        app.position.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sorting
    if (sortConfig !== null) {
       // Helper to get sortable value
      const getSortValue = (app: JobApplication, key: keyof JobApplication | 'lastUpdated') => {
        if (key === 'lastUpdated') {
          return app.statusHistory[app.statusHistory.length - 1]?.timestamp || '';
        }
        return app[key as keyof JobApplication];
      };

      filtered.sort((a, b) => {
        const aValue = getSortValue(a, sortConfig.key);
        const bValue = getSortValue(b, sortConfig.key);

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [applications, searchTerm, statusFilter, sortConfig]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredApplications.slice(startIndex, endIndex);
  }, [filteredApplications, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Optional: Scroll to top when page changes
      // window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // --- Event Handlers ---
  const requestSort = (key: keyof JobApplication | 'lastUpdated') => {
    let direction: "ascending" | "descending" = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleStatusChange = useCallback((appId: string, newStatus: Status) => {
    setApplications(prevApps => {
      return prevApps.map(app => {
        if (app.id === appId) {
          const newHistoryEntry = {
            status: newStatus,
            timestamp: new Date().toISOString(), // Use current time
            note: "", // Empty note initially
          };
          // Avoid adding duplicate consecutive statuses
          if (app.statusHistory[app.statusHistory.length - 1]?.status === newStatus) {
             return app;
          }
          return {
            ...app,
            status: newStatus,
            statusHistory: [...app.statusHistory, newHistoryEntry],
          };
        }
        return app;
      });
    });
     // Add toast notification from sonner
     toast.success(`Status updated to ${newStatus}`);
  }, []);

  const handleOpenStatusUpdate = useCallback((appId: string, newStatus: Status) => {
    const app = applications.find(a => a.id === appId);
    if (app) {
      setModalState({ 
        isOpen: true, 
        appId, 
        newStatus, 
        company: app.company, 
        position: app.position 
      });
    }
  }, [applications]);

  const handleSaveStatusUpdate = useCallback((note: string) => { // Remove stage parameter
    const { appId, newStatus } = modalState;
    if (!appId || !newStatus) return; // Should not happen if modal is open

    setApplications(prevApps => {
      return prevApps.map(app => {
        if (app.id === appId) {
          const newHistoryEntry: StatusHistoryEntry = {
            status: newStatus,
            timestamp: new Date().toISOString(),
            note: note || "", // Save the note, which may contain stage info
          };

          // Avoid adding duplicate consecutive statuses (based on status alone now)
          const lastEntry = app.statusHistory[app.statusHistory.length - 1];
          if (lastEntry?.status === newStatus) {
             // Allow adding if note is different, otherwise skip?
             // For now, let's allow adding consecutive statuses if the note differs or just always add
             // Let's refine this later if needed. For simplicity, allow consecutive.
             // if (lastEntry?.note === newHistoryEntry.note) return app;
          }
          return {
            ...app,
            status: newStatus,
            statusHistory: [...app.statusHistory, newHistoryEntry],
          };
        }
        return app;
      });
    });

    toast.success(`Status updated to ${newStatus}`);
    setModalState({ isOpen: false, appId: null, newStatus: null, company: "", position: "" }); // Close modal

  }, [modalState]);

  const handleEditApplication = useCallback((appId: string) => {
    // For now just show a toast notification
    toast.info("Edit functionality will be implemented soon");
  }, []);

  const handleDeleteApplication = useCallback((appId: string) => {
    // For now just show a toast notification
    toast.info("Delete functionality will be implemented soon");
  }, []);



  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
          <div className="flex items-center space-x-2">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "table")} className="mr-4">
              <TabsList className="grid w-16 grid-cols-2">
                <TabsTrigger value="grid" className="px-2">
                  <LayoutGridIcon className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="table" className="px-2">
                  <TableIcon className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Application
            </Button>
          </div>
        </div>

        {/* --- Filtering Controls --- */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Input
            placeholder="Filter by company or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as Status | "all")}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* --- Applications Grid View --- */}
        <div className="max-h-[70vh] overflow-y-auto" style={{scrollbarWidth:"none"}}>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {paginatedApplications.length > 0 ? (
      paginatedApplications.map((app) => (
        <ApplicationCard 
          key={app.id}
          application={app}
          onRequestStatusChange={handleOpenStatusUpdate}
          onEdit={handleEditApplication}
          onDelete={handleDeleteApplication}
        />
      ))
    ) : (
      <div className="col-span-full h-32 flex items-center justify-center rounded-md border border-dashed">
        <p className="text-muted-foreground">No applications found matching your filters.</p>
      </div>
    )}
  </div>
</div>


        {/* --- Pagination Controls --- */}
        {totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {e.preventDefault(); handlePageChange(currentPage - 1);}} 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {e.preventDefault(); handlePageChange(index + 1);}}
                    isActive={currentPage === index + 1}
                    aria-current={currentPage === index + 1 ? "page" : undefined}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {/* TODO: Implement Ellipsis logic for large number of pages */}
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {e.preventDefault(); handlePageChange(currentPage + 1);}} 
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {/* --- Status Update Modal --- */}
      <StatusUpdateModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        onSubmit={handleSaveStatusUpdate}
        company={modalState.company}
        position={modalState.position}
        newStatus={modalState.newStatus ?? 'Applied'} // Provide default if null
      />

    </DashboardLayout>
  );}
