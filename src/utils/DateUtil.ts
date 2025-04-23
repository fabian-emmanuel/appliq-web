import { format, formatDistanceToNow } from "date-fns";


// Format date as relative time (e.g., "2 days ago")
export const formatRelativeTime = (dateString: string) => {
    try {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
        console.error("Error formatting relative date:", e);
        return "";
    }
};

// Format date as absolute time for timeline
export const formatTimelineDate = (dateString: string) => {
    try {
        return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
        console.error("Error formatting timeline date:", e);
        return "";
    }
};