import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export const RouteErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="container flex flex-col items-center justify-center mx-auto my-16 flex-1">
        <h3 className="">
          {error.status} {error.statusText}
        </h3>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="container mx-auto my-16 flex-1">
        <h3>Error</h3>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1 className="my-16">Unknown Error</h1>;
  }
};
