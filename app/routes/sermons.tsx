import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@vercel/remix";
import { SermonList } from "types";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const BROADCASTER_ID = process.env.SERMON_AUDIO_BROADCAST_ID!;
  const SERMON_AUDIO_API_KEY = process.env.SERMON_AUDIO_API_KEY!;

  console.log({ request, params });

  const data: SermonList = await fetch(
    `https://api.sermonaudio.com/v2/node/sermons?broadcasterID=${BROADCASTER_ID}&sortBy=newest&pageSize=${25}`,
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
    results: data?.results
      ?.filter((sermon) => sermon?.sermonID !== params?.sermonID)
      .map((sermon) => ({
        speaker: sermon?.speaker,
        sermonID: sermon.sermonID,
        displayTitle: sermon?.displayTitle,
        bibleText: sermon?.bibleText,
        preachDate: sermon?.preachDate,
      })),
  });
};

export default function SermonsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <section className="@container ">
      <h1 className="my-16 container mx-auto text-7xl tracking-normal">
        Sermons
      </h1>
      <div className="grid container my-24 mx-auto @3xl:grid-cols-3 @3xl:gap-16">
        <div className="@3xl:col-span-2">
          <Outlet />
        </div>
        <div>
          <h4>Latest sermons</h4>
          <ul className="my-4 flex flex-col gap-4 h-[500px] overflow-y-auto">
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
                  <Link
                    className="font-medium "
                    prefetch="intent"
                    to={`/sermons/${sermon.sermonID}`}
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
                  </Link>
                </li>
              );
            })}
            <li

              className="flex h-20 border-b-[1px] border-green-light pb-2 divide-green-light gap-2 items-center w-full "
            >

              <Link
                className="font-medium "
                prefetch="intent"
                to={`/sermons/all`}
              >
                All Sermons
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
