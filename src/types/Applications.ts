// Status History Entry

import React from "react";
import {Archive, Award, Send, Users, XCircle} from "lucide-react";

export interface StatusHistoryEntry {
    status: Status;
    timestamp: string;
    note?: string;
}

// Extended Job Application interface with additional fields
export interface JobApplication {
    id: string;
    company: string;
    position: string;
    status: Status;
    statusHistory: StatusHistoryEntry[];
    website?: string;
}

export type Status = "Applied" | "Interview" | "Offer" | "Rejected" | "Withdrawn";

export const statuses: Status[] = ["Applied", "Interview", "Offer", "Rejected", "Withdrawn"];

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
    Interview: {
        colorClass: "bg-purple-500",
        bgClass: "bg-purple-100",
        textClass: "text-purple-700",
        progress: 50,
        Icon: Users
    },
    Offer: {
        colorClass: "bg-green-500",
        bgClass: "bg-green-100",
        textClass: "text-green-700",
        progress: 75,
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
