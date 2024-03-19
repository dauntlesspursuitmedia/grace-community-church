import { LinksFunction, MetaFunction } from "@vercel/remix";
import { Studio } from "sanity";
import { config } from "sanity.config";

import { Hydrated } from "~/components/Hydrated";
import studioStyles from  '~/styles/studio.css?url'

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: studioStyles,
    },
  ];
};
export const meta:MetaFunction = () => [
	{title: "Studio | Grace Community Church"},
	{name: "robots", content: "noindex"},
]

export default function StudioPage() {
	return (
		<Hydrated>
			<Studio config={config} />
		</Hydrated>
	)
}
