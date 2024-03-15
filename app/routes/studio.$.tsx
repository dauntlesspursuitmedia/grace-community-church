import { MetaFunction } from "@vercel/remix";
import { Studio } from "sanity";
import { config } from "sanity.config";

import { Hydrated } from "~/components/Hydrated";
import  '~/styles/studio.css?url'

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
