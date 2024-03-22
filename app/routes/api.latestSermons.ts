import { LoaderFunctionArgs, json } from "@vercel/remix";
import { SermonList } from "types";
import invariant from "tiny-invariant";
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageSize = url.searchParams.get("pageSize");

  invariant(typeof pageSize === "string", "pageSize must be a string");

  const BROADCASTER_ID = process.env.SERMON_AUDIO_BROADCAST_ID!;
  const SERMON_AUDIO_API_KEY = process.env.SERMON_AUDIO_API_KEY!;

  // const sermons = "tetst";

  const data: SermonList = await fetch(
    `https://api.sermonaudio.com/v2/node/sermons?broadcasterID=${BROADCASTER_ID}&sortBy=newest&pageSize=${
      pageSize || 10
    }`,
    {
      headers: {
        "X-Api-Key": SERMON_AUDIO_API_KEY,
      },
    }
  ).then((response) => response.json());

	if(!data?.results) {
		return json("No data found", {status: 404})
	}


  return json(data, {
    headers: {
      "Cache-Control":
        "s-maxage=7200, stale-while-revalidate public maxage=7200",
    },
  });
};
