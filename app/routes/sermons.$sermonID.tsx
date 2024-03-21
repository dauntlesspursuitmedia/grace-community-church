import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, MetaFunction, json } from "@vercel/remix";
import invariant from "tiny-invariant";
import { Sermon } from "types";
import { HeadingWithSubtitle } from "~/components/modules/HeadingWithSubtitle";
import { cn } from "~/lib/misc";
import { ChevronLeft } from "lucide-react";

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  const root = matches.find((match) => match.id === "root")?.data?.initial;
  console.log(data?.sermon);
  return [
    { title: `${data?.sermon?.fullTitle} | ${root?.data?.title} ` },
    {
      name: "description",
      content: `${data?.sermon?.displayEventType} - ${data?.sermon?.preachDate} - Series: ${data?.sermon?.subtitle}`,
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.sermonID, "sermonID parameter is required");

  const SERMON_AUDIO_API_KEY = process.env.SERMON_AUDIO_API_KEY!;

  // const sermons = "tetst";

  const sermon: Sermon = await fetch(
    `https://api.sermonaudio.com/v2/node/sermons/${params.sermonID}`,
    {
      headers: {
        "X-Api-Key": SERMON_AUDIO_API_KEY,
      },
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));

  if ("errors" in sermon && sermon.errors) {
    throw new Response("Something went wrong: " + sermon.errors.error, {
      status: 500,
    });
  }

  return json({
    sermon,
  });
};

export default function SermonIDRoute() {
  const { sermon } = useLoaderData<typeof loader>();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(sermon?.preachDate));

  if (!sermon) return null;
  return (
    <div className="container mx-auto ">
      <HeadingWithSubtitle
        className="w-full max-w-max"
        level={"h2"}
        subtitle={sermon?.subtitle}
        title={sermon?.fullTitle}
        _type="headingWithSubtitle"
      />
      <div className="px-4 my-4 flex gap-4 items-center">
        <img
          width={50}
          height={50}
          src={sermon?.speaker?.roundedThumbnailImageURL}
          alt={sermon?.speaker?.displayName}
        />
        <div>
          <p className="font-bold">{sermon?.speaker?.displayName}</p>
          <p className="italic text-gray">
            {sermon?.eventType} - {formattedDate}{" "}
            {sermon?.bibleText && (
              <span className="not-italic text-yellow-darker">
                | {sermon?.bibleText}
              </span>
            )}
          </p>
        </div>
      </div>
      <NavLink
        to="/sermons"
        className={({ isActive }) =>
          cn(isActive && "text-green-light font-normal flex gap-1 items-center")
        }
        prefetch="intent"
      >
        <ChevronLeft className="size-4" />
        Back to all Sermons
      </NavLink>
      <ul className="flex my-6 divide-x-2 divide-yellow ">
        {sermon?.media?.video && sermon.media.video.length > 0 && (
          <li className="uppercase px-4">
            <NavLink
              to="v"
              className={({ isActive }) =>
                cn(isActive && "text-yellow font-semibold")
              }
              prefetch="intent"
            >
              Video
            </NavLink>
          </li>
        )}
        <li className="uppercase px-4">
          <NavLink
            className={({ isActive }) =>
              cn(isActive && "text-yellow font-semibold")
            }
            prefetch="intent"
            to="a"
          >
            Audio
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
