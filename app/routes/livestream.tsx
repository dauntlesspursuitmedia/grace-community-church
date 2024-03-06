import { MetaFunction } from "@vercel/remix";

export const meta: MetaFunction = () => {
	return [
		{
			title: "Livestream | Grace Community Church"
		},
		{
			name: "description",
			content: "Watch the Grace Community Church Livestream"
		}
	]
}

export default function LivestreamRoute() {
	return (
    <section className="flex flex-col gap-24 container mx-auto my-24 items-center justify-center">
      <h1 className="self-start">Livestream</h1>
      <div className="relative w-full h-full aspect-video">
        <iframe
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
      <iframe
        tabIndex={-1}
        title="all sermons"
        width={1}
        height={901}
        src="https://embed.sermonaudio.com/browser/broadcaster/cbcofmanchestertn/?sort=newest&page_size=10&scrolls=false&style=compact&rounded=true"
        className="w-full"
        // style="min-width: 100%; max-width: 100%; "
        allow="autoplay"
      ></iframe>
      <iframe
        // tabindex="-1"
        width="100%"
        height="150"
        title="single sermon"
        src="https://embed.sermonaudio.com/player/a/broadcaster/cbcofmanchestertn/"
        // style="min-width: 150px;"
        // frameborder="0"
        // scrolling="no"
      ></iframe>
      <div className=" container mx-autorelative w-full h-full aspect-video">
        <iframe
          tabIndex="-1"
					title="single sermon video"
          width="100%"
          height={500}
          src="https://embed.sermonaudio.com/player/v/broadcaster/cbcofmanchestertn/"
          // style="position:absolute;left:0;top:0"
          allowFullScreen
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </section>
  );
}
