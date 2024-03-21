import { NavLink, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@vercel/remix";
import { SeriesList, SermonList as SermonListType } from "types";
import { PaginationBar } from "~/components/PaginationBar";
import { SermonList } from "~/components/sermons/SermonList";
import { cn } from "~/lib/misc";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const BROADCASTER_ID = process.env.SERMON_AUDIO_BROADCAST_ID!;
  const SERMON_AUDIO_API_KEY = process.env.SERMON_AUDIO_API_KEY!;
  const SERMON_AUDIO_BASE_URL = process.env.SERMON_AUDIO_BASE_URL!;

  const url = new URL(request.url);
  const top = Number(url.searchParams.get("top")) || 20;

  const pageNumber = Number(url.searchParams.get("pageNumber")) || 1;

  const seriesData: SeriesList = await fetch(
    `${SERMON_AUDIO_BASE_URL}/v2/node/broadcasters/${BROADCASTER_ID}/series?sortBy=newest&pageSize=${10}&page=${1}`,
    {
      headers: {
        "X-Api-Key": SERMON_AUDIO_API_KEY,
      },
    }
  ).then((response) => response.json());

  const data: SermonListType = await fetch(
    `${SERMON_AUDIO_BASE_URL}/v2/node/sermons?broadcasterID=${BROADCASTER_ID}&sortBy=newest&pageSize=${top}&page=${pageNumber}`,
    {
      headers: {
        "X-Api-Key": SERMON_AUDIO_API_KEY,
      },
    }
  ).then((response) => response.json());

  if (!data?.results.length) {
    throw new Response("No sermons found...", { status: 404 });
  }

  return json({
    ...data,
    results: data?.results?.map((sermon) => ({
      speaker: sermon?.speaker,
      sermonID: sermon.sermonID,
      displayTitle: sermon?.displayTitle,
      bibleText: sermon?.bibleText,
      preachDate: sermon?.preachDate,
    })),
    seriesData,
  });
};
export default function SermonIndexRoute() {
  const data = useLoaderData<typeof loader>();

	console.log(data)

  return (
    <section className="@container px-4 max-w-[1920px] w-full mx-auto lg:grid lg:grid-cols-3  lg:gap-8">
      <div className="col-span-full lg:col-span-2">
        <h1>All Sermons</h1>
        <ul className="my-4 flex flex-col gap-4 h-[660px] overflow-y-auto">
          {data?.results?.map((sermon) => {
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
            }).format(new Date(sermon.preachDate));
            return (
              <li
                key={sermon.sermonID}
                className="flex h-20 border-b-[1px] border-green-light pb-2 divide-green-light gap-2 items-center w-full "
              >
                <img
                  width={50}
                  height={50}
                  src={sermon?.speaker?.roundedThumbnailImageURL}
                  alt={sermon?.speaker?.displayName}
                />
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      `font-medium`,
                      isActive && "text-green pointer-events-none"
                    )
                  }
                  prefetch="intent"
                  to={`/sermons/${sermon.sermonID}/a`}
                >
                  {sermon.displayTitle}
                  <span className="flex gap-2">
                    <span className="text-gray font-light italic">
                      {sermon?.speaker?.displayName}
                    </span>
                    <span className="font-light">
                      {formattedDate}
                      {""}
                      {sermon?.bibleText ? `| ${sermon?.bibleText}` : null}
                    </span>
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-center my-8">
          <PaginationBar totalCount={data?.totalCount || 1} />

        </div>
      </div>
      {data?.seriesData?.results?.length > 0 && (
        <aside className="">
          <SermonList
            title="Latest Series"
            listItems={data?.seriesData?.results}
          />
        </aside>
      )}
    </section>
  );
}
