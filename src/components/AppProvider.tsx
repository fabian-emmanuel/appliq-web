import type { ReactNode } from "react";
import { ThemeProvider } from "../internal-components/ThemeProvider";
import { Toaster } from "sonner";

interface Props {
  children: ReactNode;
}

/**
 * A provider wrapping the whole app.
 *
 * You can add multiple providers here by nesting them,
 * and they will all be applied to the app.
 */
export const AppProvider = ({ children }: Props) => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="career-compass-theme">
      <Toaster position="top-right" />
      {children}
    </ThemeProvider>
  );
};