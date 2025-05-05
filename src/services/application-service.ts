import {apiClient} from "@/brain/api-client.ts";
import {
    ApplicationFilterParams,
    PaginatedApplications,
    Status,
    StatusHistory,
    StatusUpdate
} from '@/types/Applications';

export const useApplicationService = {
    async fetchApplications(
        currentPage: number,
        itemsPerPage: number,
        searchTerm: string,
        statusFilter: string
    ): Promise<PaginatedApplications> {
        try {
            // Map our frontend parameters to the backend filter structure
            const query: ApplicationFilterParams = {
                page: currentPage,
                size: itemsPerPage
            };

            // Only add search if it exists
            if (searchTerm) {
                query.search = searchTerm;
            }

            // Only add status if it's not "all"
            if (statusFilter && statusFilter !== "all") {
                query.status = statusFilter as Status;
            }

            const response = await apiClient.request<{
                message: string;
                data: PaginatedApplications;
            }>({
                path: '/application',
                method: 'GET',
                secure: true,
                format: 'json',
                query
            });

            // Extract the response data directly (pagination fields exist at the top level)
            return response.data.data;
        } catch (error) {
            console.error("Error fetching applications:", error);
            throw error; // Let the error propagate to be handled by the caller
        }
    },

    async updateApplicationStatus(statusUpdateRequest: StatusUpdate) : Promise<StatusHistory> {
        try {
            const response = await apiClient.request<{
                message: string;
                data: StatusHistory;
            }>({
                path: '/application/status',
                method: 'POST',
                secure: true,
                format: 'json',
                body: statusUpdateRequest
            });

            return response.data.data
        } catch (error) {
            console.error("Error fetching applications:", error);
            throw error;
        }
    }
};