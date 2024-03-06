import { useLoaderData, useParams } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@vercel/remix";
import invariant from "tiny-invariant";
import { Sermon } from "types";

export const loader = async ({request, params}: LoaderFunctionArgs) => {

	invariant(params.sermonID, "sermonID parameter is required");

    const SERMON_AUDIO_API_KEY = process.env.SERMON_AUDIO_API_KEY!;

    // const sermons = "tetst";

    const sermon: Sermon | {errors?: {error?: string}} = await fetch(
    `https://api.sermonaudio.com/v2/node/sermons/${params.sermonID}`,
      {
        headers: {
          "X-Api-Key": SERMON_AUDIO_API_KEY,
        },
      }
    ).then((response) => response.json());

		console.log({sermon})

  if ('errors' in sermon && sermon.errors) {
    return json("Sermon not found...", { status: 404 });
  }

	return json({
		sermon
	})
}

export default function SermonIDRoute() {

	const data = useLoaderData<typeof loader>()
  return <div><pre className="overflow-clip">{JSON.stringify(data,  null, 2)}</pre></div>;
}
