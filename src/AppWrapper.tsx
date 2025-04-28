import {RouterProvider} from "react-router-dom";
import {DEFAULT_THEME} from "./constants/default-theme";
import {ThemeProvider} from "./internal-components/ThemeProvider";
import {OuterErrorBoundary} from "./internal-components/OuterErrorBoundary.tsx";
import router from "./router";
import {AuthProvider} from "./contexts/AuthContext.tsx";

export const AppWrapper = () => {
    return (
        <OuterErrorBoundary>
            <ThemeProvider defaultTheme={DEFAULT_THEME}>
                <AuthProvider>
                    <RouterProvider router={router}/>
                </AuthProvider>
            </ThemeProvider>
        </OuterErrorBoundary>
    );
};
