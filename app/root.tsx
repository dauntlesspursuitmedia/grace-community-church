
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
import "@fontsource-variable/dm-sans/standard.css"
import "~/styles/tailwind.css";
import {
  frontendUrl,
  isStegaEnabled,
  studioUrl,
} from "./sanity/projectDetails";
import { Suspense } from "react";
import VisualEditing from "./components/VisualEditing";
import { SITE_CONFIG_QUERY } from "./sanity/queries";
import { loadQuery } from "./sanity/loader.server";
import { SiteConfigDocument, siteConfigZ } from "./types/siteConfig";
import { useQuery } from "./sanity/loader";
import { Layout } from "./components/Layout";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const stegaEnabled = isStegaEnabled(request.url);
	const {pathname} = new URL(request.url)
	const isStudioRoute = pathname.startsWith("/studio")

	if(isStudioRoute) {
		return json({
      sanity: {
        isStudioRoute,
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
	}
	const initial = await loadQuery<SiteConfigDocument>(
		SITE_CONFIG_QUERY,
		{},
		{
			perspective: stegaEnabled ? "previewDrafts": "published",
		}
	).then(res => ({
		...res,
		data: res.data ? siteConfigZ.parse(res.data) : undefined,
	}))




  return json({
		initial,
		query: SITE_CONFIG_QUERY,
		params: {},
    sanity: {
      isStudioRoute,
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
  const { sanity, ENV, initial, query, params } =
    useLoaderData<typeof loader>();

  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-cream font-sans">
        {sanity.isStudioRoute ? (
          <Outlet />
        ) : (
          <>
            <Layout siteConfig={loading || !data ? initial.data : data}>
              <Outlet />
            </Layout>
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
