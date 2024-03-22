import { RouteErrorBoundary } from "~/components/RouteErrorBoundary";

export default function SeriesIndexRoute() {
	return (
		<div className="grid place-content-center place-items-center"><p>Select a sermon...</p></div>
	)
}

export function ErrorBoundary() {
  return <RouteErrorBoundary />;
}
