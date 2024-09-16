import { AuthGuard, Layout } from "@components";
import { pathRoutes } from "@constants";
import { Calendar, Home, Login, Profile } from "@pages";
import type { Router } from "@remix-run/router";
import { createBrowserRouter } from "react-router-dom";

export const routers: Router = createBrowserRouter([
	{
		path: pathRoutes.login,
		element: (
			<AuthGuard isLogin>
				<Login />
			</AuthGuard>
		),
	},
	{
		path: pathRoutes.home,
		element: (
			<AuthGuard>
				<Layout>
					<Home />
				</Layout>
			</AuthGuard>
		),
	},
	{
		path: pathRoutes.calendar,
		element: (
			<AuthGuard>
				<Layout>
					<Calendar />
				</Layout>
			</AuthGuard>
		),
	},
	{
		path: pathRoutes.perfil,
		element: (
			<AuthGuard>
				<Layout>
					<Profile />
				</Layout>
			</AuthGuard>
		),
	},
]);
