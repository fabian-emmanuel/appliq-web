// Status History Entry

import React from "react";
import {Archive, Award, Send, Users, XCircle} from "lucide-react";

export interface StatusHistory {
    id: number;
    applicationId: number;
    createdBy: number;
    status: Status;
    createdAt: string;
    notes?: string;
    testType?: string;
    interviewType?: number;
}

export interface StatusUpdate {
    applicationId: number
    status: string
    testType?: string
    interviewType?: string
    notes?: string
}


export interface ApplicationFilterParams {
    search?: string;
    status?: Status;
    from?: string;
    to?: string;
    page?: number;
    size?: number;
}

export interface JobApplication {
    id: number;
    company: string;
    position: string;
    status: Status;
    statusHistory: StatusHistory[];
    website?: string;
    applicationType?: string;
    createdAt: number;
    createdBy: number;
}

export interface PaginatedApplications {
    applications: JobApplication[];
    pagination: Pagination;
}

export interface Pagination {
    total: number;
    totalPages: number;
    page: number;
    size: number;
}

export type Status = "Applied" | "Test" | "Interview" | "OfferAwarded" | "Rejected" | "Withdrawn";

export const statuses: Status[] = ["Applied", "Test", "Interview", "OfferAwarded", "Rejected", "Withdrawn"];

export interface StatusDetails {
    colorClass: string;
    bgClass: string;
    textClass: string;
    progress: number;
    Icon: React.ElementType;
}

export const statusDetailsMap: Record<Status, StatusDetails> = {
    Applied: {
        colorClass: "bg-blue-500",
        bgClass: "bg-blue-100",
        textClass: "text-blue-700",
        progress: 25,
        Icon: Send
    },
    Test: {
        colorClass: "bg-amber-500",
        bgClass: "bg-amber-100",
        textClass: "text-amber-700",
        progress: 35,
        Icon: Send
    },
    Interview: {
        colorClass: "bg-purple-500",
        bgClass: "bg-purple-100",
        textClass: "text-purple-700",
        progress: 50,
        Icon: Users
    },
    OfferAwarded: {
        colorClass: "bg-green-500",
        bgClass: "bg-green-100",
        textClass: "text-green-700",
        progress: 100,
        Icon: Award
    },
    Rejected: {
        colorClass: "bg-red-500",
        bgClass: "bg-red-100",
        textClass: "text-red-700",
        progress: 100,
        Icon: XCircle
    },
    Withdrawn: {
        colorClass: "bg-yellow-500",
        bgClass: "bg-yellow-100",
        textClass: "text-yellow-700",
        progress: 100,
        Icon: Archive
    },
};
