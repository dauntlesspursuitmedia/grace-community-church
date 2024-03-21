import { Outlet, useLocation } from "@remix-run/react";
import { MetaFunction } from "@vercel/remix";
import { cn } from "~/lib/misc";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Sermons | Grace Community Church",
    },
    {
      name: "description",
      content:
        "Discover inspiring and insightful sermons from Grace Community Church. Explore our collection of biblical teachings that will strengthen your faith and help you grow spiritually.",
    },
  ];
};

export default function SermonsPage() {
  const location = useLocation();

  return (
    <section className="@container px-4">
      <div className="grid   my-24 relative mx-auto gap-8   @4xl:grid-cols-3 @4xl:gap-16">
        <div
          className={cn(
            "col-span-full",
            location.pathname !== "/sermons" && "@3xl:col-span-2"
          )}
        >
          <Outlet />
        </div>
      </div>
    </section>
  );
}
