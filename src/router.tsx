// src/router.tsx
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { userRoutes } from "./user-routes";
import {SuspenseWrapper} from "components/SuspenseWrapper.tsx";


const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const SomethingWentWrongPage = lazy(
    () => import("./pages/SomethingWentWrongPage"),
);

const router = createBrowserRouter(
    [
        ...userRoutes,
        {
            path: "*",
            element: (
                <SuspenseWrapper>
                    <NotFoundPage />
                </SuspenseWrapper>
            ),
            errorElement: (
                <SuspenseWrapper>
                    <SomethingWentWrongPage />
                </SuspenseWrapper>
            ),
        },
    ]
);

export default router;