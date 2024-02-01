
import { useLoaderData } from "@remix-run/react";
import { defer, json, LoaderFunctionArgs, type MetaFunction } from "@vercel/remix";
import { HeroModule } from "~/components/modules/HeroModule";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { HOME_PAGE_QUERY } from "~/sanity/queries";
import { HomeDocument, homeZ } from "~/types/home";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({request}: LoaderFunctionArgs) => {
	const {pathname} = new URL(request.url)
	const heroData = await loadQuery<HomeDocument>(HOME_PAGE_QUERY, {}, {
		perspective: "published"
	}).then(res => ({
		...res,
		data: res ? homeZ.parse(res.data).pageLayouts.modules?.[0] : null,
	}))
	// const otherModules = loadQuery
	return defer({
		heroData: heroData,
		params: {},
		query: HOME_PAGE_QUERY,
		pathname
	})
}

export default function Index() {
	const {heroData, pathname, query, params} = useLoaderData<typeof loader>()

	const {data, loading} = useQuery<typeof heroData.data>(query, params, {initial: heroData})



  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
		<>
			<HeroModule {...data} />

			<pre>{JSON.stringify(data, null, 2)}</pre>
		</>
  );
}
