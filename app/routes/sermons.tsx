import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@vercel/remix";
import { CameraOff } from "lucide-react";
import { useLocale } from "sanity";
import { SeriesList, SermonList } from "types";
import { PaginationBar } from "~/components/PaginationBar";
import { cn } from "~/lib/misc";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const BROADCASTER_ID = process.env.SERMON_AUDIO_BROADCAST_ID!;
  const SERMON_AUDIO_API_KEY = process.env.SERMON_AUDIO_API_KEY!;
  const SERMON_AUDIO_BASE_URL = process.env.SERMON_AUDIO_BASE_URL!;

  const url = new URL(request.url);
  const top = Number(url.searchParams.get("top")) || 10;
  const pageNumber = Number(url.searchParams.get("pageNumber")) || 1;

  // /v2/node/broadcasters/{broadcaster_id}/series

  const seriesData: SeriesList = await fetch(
    `${SERMON_AUDIO_BASE_URL}/v2/node/broadcasters/${BROADCASTER_ID}/series?sort_by=last_updated&pageSize=${top}&page=${pageNumber}`,
    {
      headers: {
        "X-Api-Key": SERMON_AUDIO_API_KEY,
      },
    }
  ).then((response) => response.json());

  const data: SermonList = await fetch(
    `${SERMON_AUDIO_BASE_URL}/v2/node/sermons?broadcasterID=${BROADCASTER_ID}&sortBy=newest&pageSize=${10}`,
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
    seriesData: seriesData,
  });
};

// export function setSearchParamsString(
//   searchParams: URLSearchParams,
//   changes: Record<string, string | number | undefined>
// ) {
//   const newSearchParams = new URLSearchParams(searchParams);
//   for (const [key, value] of Object.entries(changes)) {
//     if (value === undefined) {
//       newSearchParams.delete(key);
//       continue;
//     }
//   }
//   console.log({
//     finalParams: Array.from(newSearchParams.entries())
//       .map(([key, value]) =>
//         value ? `${key}=${encodeURIComponent(value)}` : key
//       )
//       .join("&"),
//   });

//   // Print string manually to avoid over-encoding the URL
//   // Browsers are ok with $ nowadays
//   // optional: return newSearchParams.toString()
//   return Array.from(newSearchParams.entries())
//     .map(([key, value]) =>
//       value ? `${key}=${encodeURIComponent(value)}` : key
//     )
//     .join("&");
// }

export default function SermonsPage() {
  const data = useLoaderData<typeof loader>();
  const location = useLocation();

  return (
    <section className="@container px-4">
      <div className="grid container  my-24 relative mx-auto gap-8  @3xl:grid-cols-3 @3xl:gap-16">
        <div
          className={cn(
            "col-span-full",
            location.pathname !== "/sermons" && "@3xl:col-span-2"
          )}
        >
          <Outlet />
        </div>
        {location.pathname !== "/sermons" && (
          <div className={cn("")}>
            <h4>Latest sermons</h4>
            <ul className="my-4 flex w-full flex-col gap-4 h-[660px] overflow-y-auto">
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
                          `font-medium w-full`,
                          isActive && "text-green pointer-events-none"
                        )
                      }
                      prefetch="intent"
                      to={`/sermons/${sermon.sermonID}/v`}
                    >
                      {sermon.displayTitle}
                      <span className={cn("flex gap-2 ", sermon?.bibleText && "flex-col")}>
                        <span className=" text-sm text-gray font-light italic">
                          {sermon?.speaker?.displayName}
                        </span>
                        <span className="font-light text-sm">
                          {formattedDate}
                          {""}
                          {sermon?.bibleText ? ` | ${sermon?.bibleText}` : null}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                );
              })}
              <li className="flex h-20 border-b-[1px] border-green-light pb-2 divide-green-light gap-2 items-center w-full ">
                <Link
                  className="font-medium "
                  prefetch="intent"
                  to={`/sermons?pageNumber=1&top=20`}
                >
                  All Sermons
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

    </section>
  );
}
