import { MetaFunction } from "@vercel/remix";
import { useState } from "react";
import { RouteErrorBoundary } from "~/components/RouteErrorBoundary";
import { cn } from "~/lib/misc";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Livestream | Grace Community Church",
    },
    {
      name: "description",
      content: "Watch the Grace Community Church Livestream",
    },
  ];
};

export default function LivestreamRoute() {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <section className="flex flex-col gap-24 container mx-auto my-24 items-center justify-center">
      <h1 className="self-start">Livestream</h1>
      <div className={cn("relative w-full h-full aspect-video", !loaded && "bg-gray/20 animate-pulse")}>
        <iframe
          onLoad={() => setLoaded(true)}
          tabIndex={-1}
          title="SermonAudio Livestream"
          width="100%"
          height="100%"
          src="https://embed.sermonaudio.com/player/l/cbcofmanchestertn/"
          // style="position:absolute;left:0;top:0"
          // className="absolute left-0 top-0"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

export function ErrorBoundary() {
  return <RouteErrorBoundary />;
}
