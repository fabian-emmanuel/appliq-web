// --- Temporary Static Data ---
import {JobApplication} from "@/types/Applications.ts";

export const initialApplications: JobApplication[] = [
    {
        id: "1",
        company: "TechCorp",
        position: "Software Engineer",
        status: "Interview",
        website: "https://techcorp.example.com",
        statusHistory: [
            { status: "Applied", createdAt: "2025-04-10T10:00:00Z", notes: "Submitted resume and portfolio" },
            { status: "Interview", createdAt: "2025-04-15T14:30:00Z", notes: "Technical Screen scheduled with team lead" } // Stage info in note
        ]
    },
    {
        id: "2",
        company: "Innovate Solutions",
        position: "Frontend Developer",
        status: "Applied",
        website: "https://innovatesolutions.example.com",
        statusHistory: [
            { status: "Applied", createdAt: "2025-04-10T09:00:00Z", notes: "Applied via company website" }
        ]
    },
    {
        id: "3",
        company: "Business Inc.",
        position: "Project Manager",
        status: "Rejected",
        website: "https://business-inc.example.com",
        statusHistory: [
            { status: "Applied", createdAt: "2025-03-25T11:00:00Z" },
            { status: "Interview", createdAt: "2025-03-30T16:00:00Z", notes: "First round with HR" },
            { status: "Rejected", createdAt: "2025-04-01T10:00:00Z", notes: "Position filled internally" }
        ]
    },
    {
        id: "4",
        company: "Data Dynamics",
        position: "Data Scientist",
        status: "Offer",
        website: "https://datadynamics.example.com",
        statusHistory: [
            { status: "Applied", createdAt: "2025-03-15T08:00:00Z" },
            { status: "Interview", createdAt: "2025-03-20T13:00:00Z", notes: "Technical assessment and team interview" },
            { status: "Offer", createdAt: "2025-03-28T17:00:00Z", notes: "$95K annual, remote with quarterly on-site" }
        ]
    },
    {
        id: "5",
        company: "Web Weavers",
        position: "UI/UX Designer",
        status: "Applied",
        statusHistory: [
            { status: "Applied", createdAt: "2025-04-18T12:00:00Z", notes: "Submitted portfolio and case studies" }
        ]
    },
    {
        id: "6",
        company: "TechCorp",
        position: "Senior Software Engineer",
        status: "Withdrawn",
        website: "https://techcorp.example.com",
        statusHistory: [
            { status: "Applied", createdAt: "2025-02-20T09:00:00Z" },
            { status: "Interview", createdAt: "2025-03-01T11:00:00Z", notes: "Good conversation, but position requires relocation" },
            { status: "Withdrawn", createdAt: "2025-03-05T15:00:00Z", notes: "Not interested in relocation at this time" }
        ]
    },
    {
        id: "7",
        company: "Innovate Solutions",
        position: "Backend Developer",
        status: "Interview", // Keep main status
        website: "https://innovatesolutions.example.com",
        statusHistory: [
            { status: "Applied", createdAt: "2025-04-19T10:00:00Z" },
            { status: "Interview", createdAt: "2025-04-20T14:30:00Z", notes: "Initial Screen scheduled" } // Stage info in note
        ]
    },
    {
        id: "8",
        company: "Creative Hub",
        position: "Graphic Designer",
        status: "Applied",
        statusHistory: [ { status: "Applied", createdAt: "2025-04-21T09:00:00Z" } ]
    },
    {
        id: "9",
        company: "Cloud Services Ltd.",
        position: "DevOps Engineer",
        status: "Interview", // Keep main status
        website: "https://cloudsvc.example.com",
        statusHistory: [
            { status: "Applied", createdAt: "2025-04-12T11:00:00Z" },
            { status: "Interview", createdAt: "2025-04-18T10:30:00Z", notes: "Technical Challenge received" } // Stage info in note
        ]
    },
    {
        id: "10",
        company: "Marketing Masters",
        position: "Social Media Manager",
        status: "Rejected",
        statusHistory: [
            { status: "Applied", createdAt: "2025-04-05T15:00:00Z" },
            { status: "Rejected", createdAt: "2025-04-10T09:00:00Z", notes: "Went with another candidate" }
        ]
    },
    {
        id: "11",
        company: "Finance Solutions",
        position: "Financial Analyst",
        status: "Applied",
        statusHistory: [ { status: "Applied", createdAt: "2025-04-20T16:00:00Z" } ]
    },
    {
        id: "12",
        company: "TechCorp",
        position: "QA Tester",
        status: "Applied",
        website: "https://techcorp.example.com",
        statusHistory: [ { status: "Applied", createdAt: "2025-04-21T11:30:00Z" } ]
    },
];