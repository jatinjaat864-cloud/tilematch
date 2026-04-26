import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./pages/Home"));
const GamePage = lazy(() => import("./pages/Game"));
const StatsPage = lazy(() => import("./pages/Stats"));

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={null}>
      <HomePage />
    </Suspense>
  ),
});

const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/game",
  component: () => (
    <Suspense fallback={null}>
      <GamePage />
    </Suspense>
  ),
});

const statsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/stats",
  component: () => (
    <Suspense fallback={null}>
      <StatsPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([homeRoute, gameRoute, statsRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
