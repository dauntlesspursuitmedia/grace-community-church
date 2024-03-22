import { useLoaderData, useOutletContext } from "@remix-run/react";
import { LoaderFunctionArgs, MetaFunction, json } from "@vercel/remix";
import { Page } from "~/components/Page";
import { RouteErrorBoundary } from "~/components/RouteErrorBoundary";
import { urlFor } from "~/lib/urlFor";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { PAGE_QUERY } from "~/sanity/queries";
import { PageDocument, pageZ } from "~/types/page";

export const meta: MetaFunction<typeof loader> = ({
  data,
  matches,
  location,
}) => {
  const routeData = data?.initial?.data?.route;
  const rootData = matches.find((match) => match.id === "root")?.data?.initial
    ?.data;

  // const image =
  //   urlFor(routeData?.seo?.ogImage || "")
  //     .width(200)
  //     .height(150)
  //     .auto("format")
  //     .quality(60)
  //     .url() || "";

  return [
    {
      title: `${routeData?.seo?.metaTitle ?? routeData?.title} | ${
        rootData?.title
      }`,
    },
    {
      name: "description",
      content: `${
        routeData?.seo?.metaDescription ||
        `Welcome to Grace Community Church, a reformed baptist church dedicated to glorifying God and proclaiming the gospel of Jesus Christ. Discover a loving community committed to biblical truth, spiritual growth, and serving others. Join us for engaging worship services, sound biblical teaching, and opportunities to connect and grow in your faith.`
      }`,
    },
    { tagName: "link", rel: "canonical", href: rootData?.url },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        datePublished: "2023-10-04",
        url: rootData?.url + location.pathname,
        name: `${routeData?.seo?.metaTitle ?? routeData?.title} | ${
          rootData?.title
        }`,
        // image: image,
        about: {
          "@type": "Thing",
          description: routeData?.seo?.metaDescription,
        },
      },
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {

  const data = await loadQuery<PageDocument>(
    PAGE_QUERY,
    {
      slug: params.slug,
    },
    {
      perspective: "published",
    }
  ).then((res) => ({
    ...res,
    data: res ? pageZ.parse(res.data) : null,
  }));

  if (!data.data) {
    throw new Response("Not found", { status: 404 });
  }

  return json(
    {
      initial: data,
      query: PAGE_QUERY,
      params,
    },
    {
      headers: {
        "Cache-Control":
          "s-maxage=600, stale-while-revalidate public maxage=600",
      },
    }
  );
};
export default function PageRoute() {
  const { query, params, initial } = useLoaderData<typeof loader>();

  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial,
  });

  if (!data || loading) {
    return <div>Loading...</div>;
  }

  return <Page pageLayouts={data?.pageLayouts} />;
}

export function ErrorBoundary() {
  return <RouteErrorBoundary />;
}
