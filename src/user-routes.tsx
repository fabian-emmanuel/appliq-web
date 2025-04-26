// src/user-routes.tsx
import {LoadingSpinner, SuspenseWrapper} from "components/SuspenseWrapper.tsx";
import { lazy } from "react";
import { RouteObject } from "react-router";

const App = lazy(() => import("./pages/App.tsx"));
const ApplicationsPage = lazy(() => import("./pages/ApplicationsPage.tsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.tsx"));
const LoginPage = lazy(() => import("@/pages/LoginPage.tsx"));
const SignUpPage = lazy(() => import("@/pages/SignupPage.tsx"));

export const userRoutes: RouteObject[] = [
	{
		path: "/",
		element: <SuspenseWrapper><App /></SuspenseWrapper>
	},
	{
		path: "/applications-page",
		element: <SuspenseWrapper><ApplicationsPage /></SuspenseWrapper>
	},
	{
		path: "/applications",
		element: <SuspenseWrapper><ApplicationsPage /></SuspenseWrapper>
	},
	{
		path: "/dashboard-page",
		element: <SuspenseWrapper><DashboardPage /></SuspenseWrapper>
	},
	{
		path: "/dashboard",
		element: <SuspenseWrapper><DashboardPage /></SuspenseWrapper>
	},
	{
		path: "/login-page",
		element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>
	},
	{
		path: "/signup-page",
		element: <SuspenseWrapper><SignUpPage /></SuspenseWrapper>
	},
	{
		path: "/spinner",
		element: <LoadingSpinner/> //added for testing purposes
	}
];