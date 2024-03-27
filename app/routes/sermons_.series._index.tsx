import { json } from "@vercel/remix";
import { Link, useLoaderData } from "@remix-run/react";
import { CameraOff } from "lucide-react";

import { SeriesList } from "types";
import { PaginationBar } from "~/components/PaginationBar";
import { RouteErrorBoundary } from "~/components/RouteErrorBoundary";
import { formatDate } from "~/lib/formatDate";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const BROADCASTER_ID = process.env.SERMON_AUDIO_BROADCAST_ID!;
  const SERMON_AUDIO_API_KEY = process.env.SERMON_AUDIO_API_KEY!;
  const SERMON_AUDIO_BASE_URL = process.env.SERMON_AUDIO_BASE_URL!;

  const url = new URL(request.url);
  const top = Number(url.searchParams.get("top")) || 20;
  const pageNumber = Number(url.searchParams.get("pageNumber")) || 1;

  // /v2/node/broadcasters/{broadcaster_id}/series

  const data: SeriesList = await fetch(
    `${SERMON_AUDIO_BASE_URL}/v2/node/broadcasters/${BROADCASTER_ID}/series?sort_by=last_updated&pageSize=${top}&page=${pageNumber}`,
    {
      headers: {
        "X-Api-Key": SERMON_AUDIO_API_KEY,
      },
    }
  ).then((response) => response.json());

  if (!data?.results.length) {
    throw new Response("No sermons found...", { status: 404 });
  }

  return json(
    {
      data,
    },
    {
      headers: {
        "Cache-Control":
          "s-maxage=7200, stale-while-revalidate public maxage=7200",
      },
    }
  );
};
export default function SermonSeriesIndexPage() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <section className="container px-4 @container mx-auto">
      <h1 className="my-8">All Series</h1>
      <div className="  grid w-full  gap-8 md:grid-cols-2">
        {data?.results?.map((series) => (
          <div
            key={series.seriesID}
            className="border-[1px] border-gray/20 shadow-black/20 shadow-md rounded-md  hover:bg-green-light/10 focus-within:bg-green-light/10 focus-within:ring-green focus-within:ring-2 @container/card focus-within:outline-none"
          >
            <Link
              className="flex outline-none	 gap-4 flex-col @xl/card:flex-row"
              to={`${series?.seriesID}`}
            >
              {series?.image ? (
                <img
                  width={200}
                  className="w-full @xl:w-52"
                  src={series?.image}
                  alt={series?.title}
                />
              ) : (
                <div className="w-full @xl:max-w-52 aspect-square flex flex-col justify-center items-center">
                  <CameraOff />
                  <span>No image</span>
                </div>
              )}

              <div className="w-full p-4">
                <h3 className=" underline underline-offset-2 underline-green-light">
                  {series.title}
                </h3>
                {series?.description && <p>{series.description}</p>}
                <span className="flex flex-col">
                  <small>
                    Series Created:{" "}
                    <span className="italic text-yellow-darker font-bold">
                      {formatDate(series.earliest)}
                    </span>
                  </small>
                  <small>
                    Last updated:{" "}
                    <span className="italic text-yellow-darker font-bold">
                      {formatDate(series.latest)}
                    </span>
                  </small>
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="container mx-auto flex items-center justify-center mt-12">
        <PaginationBar totalCount={data.totalCount} />
      </div>
    </section>
  );
}

export function ErrorBoundary() {
  return <RouteErrorBoundary />;
}
