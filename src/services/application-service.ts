import type {User} from '@/types/User.ts'
import {apiClient} from "@/brain/api-client.ts";
import { PaginatedApplications, JobApplication, Status } from 'types/Applications';


// export const useApplicationService = {
//     async fetchApplications(currentPage: number, itemsPerPage: number, searchTerm: string, statusFilter: string): Promise<JobApplication[]> {
//         try {
//             const response = await apiClient.request<{
//                 message: string;
//                 data: JobApplication[]
//             }>({
//                 path: '/application',
//                 method: 'GET',
//                 secure: true,
//                 format: 'json'
//             });

//             return response.data.data;
//         } catch (error) {
//             // The error is already formatted by the HttpClient
//             throw error;
//         }
//     }
// };

// export const useApplicationService = { async fetchApplications (
//     currentPage: number,
//     itemsPerPage: number,
//     searchTerm: string,
//     statusFilter: string
//   ): Promise<PaginatedApplications> {
//     try {
//       const response = await apiClient.request<{
//         message: string;
//         data: PaginatedApplications;
//       }>({
//         path: '/application',
//         method: 'GET',
//         secure: true,
//         format: 'json',
//         query: {
//           page: currentPage,
//           size: itemsPerPage,
//           search: searchTerm,
//           status: statusFilter
//         }
//       });

//       return response.data.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// };

export const useApplicationService = {
    async fetchApplications(
      currentPage: number,
      itemsPerPage: number,
      searchTerm: string,
      statusFilter: string
    ): Promise<PaginatedApplications> {
      try {
        const query: Record<string, any> = {
          page: currentPage,
          size: itemsPerPage
        };
  
        if (searchTerm?.trim()) {
          query.search = searchTerm.trim();
        }
  console.log("i want to go home:", statusFilter)
        if (statusFilter && statusFilter !== "all") {
          query.status = statusFilter;
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
  
        return response.data.data;
      } catch (error) {
        throw error;
      }
    }
  };
  
export const useStatusService = {
    async fetchStatusFilter(): Promise<Status> {
        try {
            const response = await apiClient.request<{
                message: string;
                data: Status
            }>({
                path: '/application',
                method: 'GET',
                secure: true,
                format: 'json'
            });

            return response.data.data;
        } catch (error) {
            // The error is already formatted by the HttpClient
            throw error;
        }
    }
}
