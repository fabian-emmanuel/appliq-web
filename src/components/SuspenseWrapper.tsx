// src/components/SuspenseWrapper.tsx
import { ReactNode, Suspense } from "react";

// Create a loading spinner component
export const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
            <p className="text-primary font-medium">Loading...</p>
        </div>
    </div>
);

export const SuspenseWrapper = ({ children }: { children: ReactNode }) => {
    return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
};