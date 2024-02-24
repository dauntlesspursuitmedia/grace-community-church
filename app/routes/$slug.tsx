import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@vercel/remix";
import { Page } from "~/components/Page";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { PAGE_QUERY } from "~/sanity/queries";
import { PageDocument, pageZ } from "~/types/page";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {

	console.log({params})
  const data = await loadQuery<PageDocument>(
    PAGE_QUERY,
    {
      slug: params.slug,
    },
    {
      perspective: "published",
    }
  ).then((res) => ({
    ...res,
    data: res ? pageZ.parse(res.data) : null,
  }));

	if(!data.data) {
		throw new Response("Not found", { status: 404 });
	}

  return json({
    initial: data,
    query: PAGE_QUERY,
    params,
  });
};
export default function PageRoute() {
  const { query, params, initial } = useLoaderData<typeof loader>();

  const { data, loading } = useQuery<typeof initial.data>(
    query,
    params,
    {
      initial,
    }
  )

	if(!data || loading) {
		return <div>Loading...</div>
	}

  return (

		<Page pageLayouts={data?.pageLayouts} />
  );
}
