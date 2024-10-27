import { AuthGuard, Layout } from "@components";
import { pathRoutes } from "@constants";
import { Calendar, Home, Login, Profile } from "@pages";
import type { Router } from "@remix-run/router";
import { createBrowserRouter } from "react-router-dom";

const createRoute = (path: string, element: JSX.Element) => ({
  path,
  element: <AuthGuard isLogin>{element}</AuthGuard>,
});

const createLayoutRoute = (path: string, element: JSX.Element) => ({
  path,
  element: (
    <AuthGuard>
      <Layout>{element}</Layout>
    </AuthGuard>
  ),
});

export const routers: Router = createBrowserRouter([
  createRoute(pathRoutes.login, <Login />),
  createLayoutRoute(pathRoutes.home, <Home />),
  createLayoutRoute(pathRoutes.calendar, <Calendar />),
  createLayoutRoute(pathRoutes.perfil, <Profile />),
]);
