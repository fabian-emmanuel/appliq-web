import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {DashboardLayout} from "components/DashboardLayout";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {JobApplication, Status, statuses, StatusUpdate,} from "@/types/Applications.ts";
import {StatusUpdateModal} from "components/StatusUpdateModal"; // Import the modal
import {LayoutGridIcon, Loader2, PlusIcon, TableIcon} from "lucide-react";
import {toast} from "sonner";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {ApplicationCard} from "components/ApplicationCard.tsx";
import {useApplicationService,} from "@/services/application-service";

// --- Component ---
export default function ApplicationsPage() {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 16; // Show 16 cards per page

    // --- Modal State ---
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        appId: number | null;
        newStatus: Status | null;
        company: string;
        position: string;
    }>({
        isOpen: false,
        appId: null,
        newStatus: null,
        company: "",
        position: "",
    });

    // get all applications
    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        useApplicationService.fetchApplications(
            currentPage,
            itemsPerPage,
            searchTerm.trim(),
            statusFilter
        )
            .then(result => {
                if (isMounted) {
                    setApplications(result.applications);
                    setTotalPages(result.pagination.totalPages || 1);
                    setTotalCount(result.pagination.total || 0);
                }
            })
            .catch(error => {
                console.error("Error fetching applications:", error);
                if (isMounted) {
                    toast.error("Failed to load applications.");
                    setApplications([]);
                    setTotalPages(1);
                    setTotalCount(0);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [currentPage, itemsPerPage, searchTerm, statusFilter]);


    // Ref for the scrollable container
    const listRef = useRef<HTMLDivElement>(null);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Scroll the list container to top whenever the page changes
    useEffect(() => {
        listRef.current?.scrollTo({top: 0, behavior: "smooth"});
    }, [currentPage]);


    const handleOpenStatusUpdate = useCallback(
        (appId: number, newStatus: Status) => {
            const app = applications.find((a) => a.id === appId);
            if (app) {
                setModalState({
                    isOpen: true,
                    appId,
                    newStatus,
                    company: app.company,
                    position: app.position,
                });
            }
        },
        [applications]
    );

    const handleSaveStatusUpdate = useCallback(
        async (note: string) => {
            const {appId, newStatus} = modalState;
            if (!appId || !newStatus) return;

            try {
                setIsLoading(true);
                // Call API to update status
                const updatePayload: StatusUpdate = {
                    applicationId: appId,
                    status: newStatus,
                    notes: note || ""
                }
                const newEntry = await useApplicationService.updateApplicationStatus(updatePayload);

                // Update local state
                setApplications(prevApps =>
                    prevApps.map(app => {
                        if (app.id === updatePayload.applicationId) {
                            return {
                                ...app,
                                status: newEntry.status,
                                statusHistory: [...app.statusHistory, newEntry],
                            };
                        }
                        return app;
                    })
                );

                toast.success(`Status updated to ${newStatus}`);
            } catch (error) {
                console.error("Error updating status:", error);
                toast.error("Failed to update status.");
            } finally {
                setIsLoading(false);
                // Close modal
                setModalState({
                    isOpen: false,
                    appId: null,
                    newStatus: null,
                    company: "",
                    position: "",
                });
            }
        },
        [modalState]
    );


    const handleEditApplication = useCallback((appId: number) => {
        // For now just show a toast notification
        toast.info("Edit functionality will be implemented soon");
    }, []);

    const handleDeleteApplication = useCallback((appId: number) => {
        // For now just show a toast notification
        toast.info("Delete functionality will be implemented soon");
    }, []);

    // useMemo to calculate pages + ellipses
    const paginationRange = useMemo<(number | string)[]>(() => {
        const totalPageNumbers = 5 // first, last, current, plus two siblings
        if (totalPages <= totalPageNumbers) {
            return Array.from({length: totalPages}, (_, i) => i + 1)
        }

        const siblingCount = 1
        const showLeftEllipsis = currentPage > siblingCount + 2
        const showRightEllipsis = currentPage < totalPages - (siblingCount + 1)
        const leftSibling = Math.max(currentPage - siblingCount, 2)
        const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1)

        const pages: (number | string)[] = [1]

        if (showLeftEllipsis) {
            pages.push("...")
        }

        for (let page = leftSibling; page <= rightSibling; page++) {
            pages.push(page)
        }

        if (showRightEllipsis) {
            pages.push("...")
        }

        pages.push(totalPages)
        return pages
    }, [currentPage, totalPages])


    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Job Applications
                    </h1>
                    <div className="flex items-center space-x-2">
                        <Tabs
                            value={viewMode}
                            onValueChange={(v) => setViewMode(v as "grid" | "table")}
                            className="mr-4"
                        >
                            <TabsList className="grid w-16 grid-cols-2">
                                <TabsTrigger value="grid" className="px-2">
                                    <LayoutGridIcon className="h-4 w-4"/>
                                </TabsTrigger>
                                <TabsTrigger value="table" className="px-2">
                                    <TableIcon className="h-4 w-4"/>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Button>
                            <PlusIcon className="h-4 w-4 mr-2"/>
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
                        onValueChange={(value) => setStatusFilter(value)}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filter by status..."/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            {statuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* --- Applications Grid View --- */}
                <div
                    ref={listRef}
                    className="max-h-[70vh] overflow-y-auto"
                    style={{scrollbarWidth: "none"}}
                >
                    {isLoading && (
                        <div className="flex justify-center py-8">
                            <Loader2 className="animate-spin h-6 w-6 text-gray-500"/>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {totalCount > 0 ? (
                            applications.map((app) => (
                                <ApplicationCard
                                    key={app.id}
                                    application={app}
                                    onRequestStatusChange={handleOpenStatusUpdate}
                                    onEdit={handleEditApplication}
                                    onDelete={handleDeleteApplication}
                                />
                            ))
                        ) : (
                            <div
                                className="col-span-full h-32 flex items-center justify-center rounded-md border border-dashed">
                                <p className="text-muted-foreground">
                                    No applications found matching your filters.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Pagination Controls --- */}
                {totalPages >= 1 && (
                    <Pagination className="mt-6">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(currentPage - 1);
                                    }}
                                    className={
                                        currentPage === 1
                                            ? "pointer-events-none opacity-50"
                                            : undefined
                                    }
                                    aria-disabled={currentPage === 1 || isLoading}
                                />
                            </PaginationItem>
                            {paginationRange.map((item, idx) =>
                                item === "..." ? (
                                    <PaginationEllipsis key={`ellipsis-${idx}`}/>
                                ) : (
                                    <PaginationItem key={item}>
                                        <PaginationLink
                                            href="#"
                                            onClick={e => {
                                                e.preventDefault();
                                                handlePageChange(item as number);
                                            }}
                                            isActive={currentPage === item}
                                            aria-current={currentPage === item ? "page" : undefined}
                                        >
                                            {item}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(currentPage + 1);
                                    }}
                                    className={
                                        currentPage === totalPages
                                            ? "pointer-events-none opacity-50"
                                            : undefined
                                    }
                                    aria-disabled={currentPage === totalPages || isLoading}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>

            {/* --- Status Update Modal --- */}
            <StatusUpdateModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({...modalState, isOpen: false})}
                onSubmit={handleSaveStatusUpdate}
                company={modalState.company}
                position={modalState.position}
                newStatus={modalState.newStatus}
            />
        </DashboardLayout>
    );
}
