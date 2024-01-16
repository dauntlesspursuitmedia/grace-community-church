import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@vercel/remix";

import "~/styles/tailwind.css";
import {
  frontendUrl,
  isStegaEnabled,
  studioUrl,
} from "./sanity/projectDetails";
import { Suspense } from "react";
import VisualEditing from "./components/VisualEditing";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const stegaEnabled = isStegaEnabled(request.url);

  return json({
    sanity: {
      isStudioRoute: new URL(request.url).pathname.startsWith("/studio"),
      stegaEnabled,
    },
    ENV: {
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID!,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET!,
      SANITY_STUDIO_API_VERSION: process.env.SANITY_STUDIO_API_VERSION!,
      // URL of the Frontend that will be loaded into Presentation
      SANITY_FRONTEND_URL: frontendUrl,
      // URL of the Studio to allow requests from Presentation
      SANITY_STUDIO_URL: studioUrl,
    },
  });
};

export default function App() {
  const { sanity, ENV } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {sanity.isStudioRoute ? (
          <Outlet />
        ) : (
          <>
            {/* <Layout home={loading || !data ? initial.data : data} theme={theme}> */}
            <Outlet />
            {/* </Layout> */}
          </>
        )}
        {/* <Outlet /> */}
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
        {!sanity.isStudioRoute && sanity.stegaEnabled ? (
          <Suspense>
            <VisualEditing studioUrl={ENV.SANITY_STUDIO_URL} />
          </Suspense>
        ) : null}
      </body>
    </html>
  );
}
