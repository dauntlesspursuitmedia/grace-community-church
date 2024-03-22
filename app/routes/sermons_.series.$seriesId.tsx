import { Await, Link, Outlet, useLoaderData } from "@remix-run/react";
import {
  LoaderFunctionArgs,
  json,
  type MetaFunction,
  defer,
} from "@vercel/remix";
import { ChevronLeft } from "lucide-react";
import React, { Suspense } from "react";
import invariant from "tiny-invariant";
import { PrimarySpeaker, Series, Sermon, SermonList as SermonListType } from "types";
import { RouteErrorBoundary } from "~/components/RouteErrorBoundary";
import { HeadingWithSubtitle } from "~/components/modules/HeadingWithSubtitle";
import { SermonList, SermonList } from "~/components/sermons/SermonList";
import { formatDate } from "~/lib/formatDate";

export const meta: MetaFunction<typeof loader> = () => {
  return [
    {
      title: "Fix this | Grace Community Church",
    },
    {
      name: "description",
      content:
        "Discover inspiring and insightful sermons from Grace Community Church. Explore our collection of biblical teachings that will strengthen your faith and help you grow spiritually.",
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const BROADCASTER_ID = process.env.SERMON_AUDIO_BROADCAST_ID!;
  const SERMON_AUDIO_API_KEY = process.env.SERMON_AUDIO_API_KEY!;
  const SERMON_AUDIO_BASE_URL = process.env.SERMON_AUDIO_BASE_URL!;

  invariant(params.seriesId, "seriesId parameter is required");

  // /v2/node/broadcasters/{broadcaster_id}/series
  // /v2/node/broadcasters/{broadcaster_id}/series/{series_id_or_name}
  ///v2/node/broadcasters/{broadcaster_id}/series/{series_id_or_name}/speakers

  const speakers: Promise<{ results: PrimarySpeaker[] }> = fetch(
    `${SERMON_AUDIO_BASE_URL}/v2/node/broadcasters/${BROADCASTER_ID}/series/${params.seriesId}/speakers`,
    {
      headers: {
        "X-Api-Key": SERMON_AUDIO_API_KEY,
      },
    }
  ).then((response) => response.json());

  const sermons: Promise<SermonListType> = fetch(
    `${SERMON_AUDIO_BASE_URL}/v2/node/sermons?broadcasterID=${BROADCASTER_ID}&series=${params.seriesId}&sortBy=newest&pageSize=${100}&page=${1}`,
    {
      headers: {
        "X-Api-Key": SERMON_AUDIO_API_KEY,
      },
    }
  ).then((response) => response.json());
  const series: Series = await fetch(
    `${SERMON_AUDIO_BASE_URL}/v2/node/broadcasters/${BROADCASTER_ID}/series/${params.seriesId}`,
    {
      headers: {
        "X-Api-Key": SERMON_AUDIO_API_KEY,
      },
    }
  ).then((response) => response.json())
  if ("errors" in series) {
    throw new Response("something went wrong", {
      status: 404,
      statusText: series?.errors?.error || "Something went wrong",
    });
  }
  return defer(
    {
      series: series,
      seriesId: params.seriesId,
      sermons: sermons,
      speakers,
    },
    {
      headers: {
        "Cache-Control":
          "s-maxage=1200, stale-while-revalidate public maxage=1200",
      },
    }
  );
};

export default function SeriesIDPage() {
  const { seriesId, series, sermons, speakers } =
    useLoaderData<typeof loader>();
  return (
    <section className="px-4 py-16  @container ">
      <h1 className="text-black container mr-auto col-span-full tracking-normal  mb-8">
        {series.title}
      </h1>
      <div className="grid @4xl:grid-cols-3 @4xl:gap-8">
        <div className="@4xl:col-span-2">
					<Link prefetch="intent" className="px-8 flex items-center underline text-green" to="/sermons/series"><ChevronLeft /> All Series</Link>
          <Suspense fallback="Loading speakers">
            <Await resolve={speakers}>
              {(speakers) => {
                return (
                  <div className="flex px-8 mt-4 gap-2 container mx-auto items-center flex-wrap">
                    {speakers?.results?.map((speaker) => (
                      <React.Fragment key={speaker.speakerID}>
                        <img
                          key={speaker.speakerID}
                          src={speaker.roundedThumbnailImageURL}
                          alt={speaker.displayName}
                          width={50}
                        />
                        <span>{speaker.displayName}</span>
                      </React.Fragment>
                    ))}
                  </div>
                );
              }}
            </Await>
          </Suspense>
          <div className="my-16">
            <Outlet />
          </div>
        </div>
        <aside className="w-full col-span-full @4xl:col-span-1">
          <Suspense
            fallback={
              <div className="h-full grid gap-6 w-full animate-pulse">
                <span className="h-6 w-full inline-block bg-gray/30"></span>
                <span className="h-6 w-full inline-block bg-gray/30"></span>
                <span className="h-6 w-full inline-block bg-gray/30"></span>
                <span className="h-6 w-full inline-block bg-gray/30"></span>
              </div>
            }
          >
            <Await resolve={sermons}>
              {(sermons) => (
                <SermonList
                  seriesId={seriesId}
                  title={`${sermons.totalCount} Total Sermons`}
                  listItems={sermons.results}
                />
              )}
            </Await>
          </Suspense>
        </aside>
      </div>
    </section>
  );
}

export function ErrorBoundary() {
  return <RouteErrorBoundary />;
}
