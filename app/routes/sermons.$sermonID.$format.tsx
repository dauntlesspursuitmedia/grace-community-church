import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@vercel/remix";
import { useState } from "react";
import invariant from "tiny-invariant";
import { cn } from "~/lib/misc";

interface LoaderData {
	format: "v" | "a";
	sermonID: string;
}

export const loader = async ({request, params}: LoaderFunctionArgs) => {





  invariant(params.format, "format parameter is required")
	invariant(params.sermonID, "Sermon ID required");






	const {format, sermonID} = params

	if(format !== "a" &&  format !== "v") {
    throw new Response("Invalid format", { status: 400 });
	}

	return json({format, sermonID})
}

export default function SermonFormatRoute() {

	const {format, sermonID} = useLoaderData<LoaderData>()

	const [loaded, setIsLoaded] = useState<boolean>(false)

  return (
    <div className={cn("bg-green rounded-md overflow-hidden shadow-md shadow-black/20", format === "v"  ? " aspect-video " : "aspect-auto", !loaded && "animate-pulse")}>
      {/* <pre>{JSON.stringify(sermon, null, 2)}</pre> */}
      <iframe
        // tabindex="-1"
				onLoad={() => setIsLoaded(true)}
        width="100%"
        height="100%"
        className="shadow-lg shadow-black/20"
        title="single sermon"
        allowFullScreen={true}
        src={`https://embed.sermonaudio.com/player/${format}/${sermonID}`}
      ></iframe>
    </div>
  );
}
