import { Await, useLoaderData } from "@remix-run/react";
import {
  LoaderFunctionArgs,
  json,
  type MetaFunction,
  defer,
} from "@vercel/remix";
import React, { Suspense } from "react";
import invariant from "tiny-invariant";
import { PrimarySpeaker, Series, SermonList } from "types";
import { HeadingWithSubtitle } from "~/components/modules/HeadingWithSubtitle";
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

  const sermons: Promise<SermonList> = fetch(
    `${SERMON_AUDIO_BASE_URL}/v2/node/sermons?broadcasterID=${BROADCASTER_ID}&sortBy=newest&pageSize=${100}&page=${1}`,
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
  ).then((response) => response.json());

  if (!series) {
    throw new Response("No sermons found...", { status: 404 });
  }
  return defer({
    series: series,
    seriesId: params.seriesId,
    sermons: sermons,
    speakers,
  });
};

export default function SeriesIDPage() {
  const { seriesId, series, sermons, speakers } =
    useLoaderData<typeof loader>();
  return (
    <section className="px-4 py-16">
      <div>
        <h1 className="text-green tracking-normal">{series.title}</h1>
        <Suspense fallback="Loading speakers">
          <Await resolve={speakers}>
            {(speakers) => (
              <div className="flex gap-2 items-center flex-wrap">
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
                <span className="block w-full">Last Updated: {formatDate(series.latest)}</span>
              </div>
            )}
          </Await>
        </Suspense>
      </div>
      this is the seriets id routef
      <pre>{JSON.stringify(seriesId, null, 2)}</pre>
    </section>
  );
}
