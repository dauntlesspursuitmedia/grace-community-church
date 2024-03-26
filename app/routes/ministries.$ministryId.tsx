import { Link, useLoaderData, useParams } from "@remix-run/react";
import { RouteErrorBoundary } from "~/components/RouteErrorBoundary";
import { LoaderFunctionArgs, json } from "@vercel/remix";
import { loadQuery } from "~/sanity/loader.server";
import { MINISTRY_QUERY } from "~/sanity/queries";
import { MinistryType, ministryZ } from "~/types/ministry";
import invariant from "tiny-invariant";
import { useQuery } from "~/sanity/loader";
import { SanityImage } from "~/components/SanityImage";
import { cn } from "~/lib/misc";
import { RichText } from "~/components/modules/RichText";
import { Gallery } from "~/components/modules/Gallery";
import { Action } from "~/components/Action";
export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.ministryId, "ministryId parameter is required");

  const data = await loadQuery<MinistryType>(
    MINISTRY_QUERY,
    {
      slug: params.ministryId,
    },
    {
      perspective: "published",
    }
  ).then((res) => ({
    ...res,
    data: res ? ministryZ.parse(res.data) : null,
  }));

  if (!data.data) {
    throw new Response("Not found", { status: 404 });
  }
  return json(
    {
      initial: data,
      query: MINISTRY_QUERY,
      params,
    },
    {
      headers: {
        "Cache-Control":
          "s-maxage=7200, stale-while-revalidate public maxage=7200",
      },
    }
  );
};
// @TODO flesh this out
export default function MinistryIdRoute() {
  const { query, params, initial } = useLoaderData<typeof loader>();

  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial,
  });

  if (!data || loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container mt-16 @container mx-auto">
      <div
        className={cn(
          "grid @4xl:grid-cols-2 gap-8 @4xl:gap-16",
          !data?.mainImage &&
            "@4xl:grid-cols-1 place-content-center place-items-center"
        )}
      >
        {data?.mainImage && (
          <SanityImage
            value={data?.mainImage}
            className={cn(
              " w-full h-full rounded-xl shadow-black/30 shadow-xl"
            )}
          />
        )}
        <div className="px-8  items-center">
          <h1 className="tracking-normal text-6xl font-bold mb-4">
            {data?.title}
          </h1>
          <RichText content={data?.description?.content} />
          <div className="mt-8 max-w-max">
            <Action
              action={{
                actionType: "button",
                actionStyle: {
                  color: "black",
                  buttonStyle: "outline",
                },
                title: `Contact us about ${data?.title}`,
                internalLink: { slug: `/contact?subject=${data?.title}&subjectId=${data?._id}` },
                _type: "action",
              }}
            />
          </div>
        </div>
      </div>
      {data?.photoGallery && (
        <Gallery
          _type="galleryModule"
          images={data?.photoGallery}
          heading={{
            title: "Media",
            level: "h2",
            textAlign: "left",
            _type: "headingWithSubtitle",
          }}
        />
      )}
    </section>
  );
}

export function ErrorBoundary() {
  return <RouteErrorBoundary />;
}
