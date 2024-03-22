import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, MetaFunction, json } from "@vercel/remix";
import invariant from "tiny-invariant";
import { Sermon } from "types";
import { HeadingWithSubtitle } from "~/components/modules/HeadingWithSubtitle";
import { cn } from "~/lib/misc";
import { ChevronLeft } from "lucide-react";
import { RouteErrorBoundary } from "~/components/RouteErrorBoundary";

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  const root = matches.find((match) => match.id === "root")?.data?.initial;

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

  return json(
    {
      sermon,
    },
    {
      headers: {
        "Cache-Control":
          "s-maxage=28800, stale-while-revalidate public maxage=28800",
      },
    }
  );
};

export default function SermonInSeriesRoute() {
  const { sermon } = useLoaderData<typeof loader>();

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


export function ErrorBoundary() {
  return <RouteErrorBoundary />;
}
