import { NavLink } from "@remix-run/react";
import { Series } from "types";
import { formatDate } from "~/lib/formatDate";
import { cn } from "~/lib/misc";

export const SeriesListItem = ({ series }: { series: Series }) => {
  return (
    <li
      key={series.seriesID}
      className="flex h-20 border-b-[1px] border-green-light pb-2 divide-green-light gap-2 items-center w-full "
    >
      {series?.image ? (
        <img width={50} height={50} src={series?.image} alt={series?.title} />
      ) : null}
      <NavLink
        className={({ isActive }) =>
          cn(`font-medium w-full`, isActive && "text-green pointer-events-none")
        }
        prefetch="intent"
        to={`series/${series.seriesID}`}
      >
        {series.title}
        <span className={cn("flex gap-2 ")}>
          {/* <span className=" text-sm text-gray font-light italic">
            {series?.}
          </span> */}
          <span className="font-light text-sm">
            Last updated: {formatDate(series.latest)}
          </span>
        </span>
      </NavLink>
    </li>
  );
};
