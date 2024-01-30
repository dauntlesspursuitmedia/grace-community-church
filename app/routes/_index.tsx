import { Link } from "@remix-run/react";
import type { MetaFunction } from "@vercel/remix";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
		<section>
			<img alt="" src="https://picsum.photos/1600/900" width={1600} height={900} className="w-full"  />
			tehis is a section
		</section>
  );
}
