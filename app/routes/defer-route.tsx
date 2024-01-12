import { Await, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, defer } from "@vercel/remix";
import { Suspense } from "react";

export async function loader({request}: LoaderFunctionArgs) {

	const version = process.versions.node

	return defer({
		version: sleep(version, 150)
	})
}

// don't let the promise resolve for 1 second
function sleep(val: string, ms: number) {
return new Promise(resolve => setTimeout(() => resolve(val), ms))
}


export default function DeferRoute() {
	const {version} = useLoaderData<typeof loader>()

	return (
		<Suspense fallback="loading...">
			<Await resolve={version}>{(version) => <strong className="bg-red-600">{version}</strong> }</Await>
		</Suspense>
	)
}
