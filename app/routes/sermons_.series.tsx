import { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { RouteErrorBoundary } from "~/components/RouteErrorBoundary";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Series | Grace Community Church",
    },
    {
      name: "description",
      content:
        "Discover inspiring and insightful sermons from Grace Community Church. Explore our collection of biblical teachings that will strengthen your faith and help you grow spiritually.",
    },
  ];
};

export default function SermonSeriesRoute() {
  return <Outlet />;
}

export function ErrorBoundary() {
  return <RouteErrorBoundary />;
}
