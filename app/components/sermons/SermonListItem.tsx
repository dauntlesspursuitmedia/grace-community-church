import { NavLink } from "@remix-run/react";
import { Sermon } from "types";
import { formatDate } from "~/lib/formatDate";
import { cn } from "~/lib/misc";

export const SermonListItem = ({ sermon }: { sermon: Sermon }) => {

  return (
    <li
      key={sermon.sermonID}
      className="flex h-20 border-b-[1px] border-green-light pb-2 divide-green-light gap-2 items-center w-full "
    >
      <img
        width={50}
        height={50}
        src={sermon?.speaker?.roundedThumbnailImageURL}
        alt={sermon?.speaker?.displayName}
      />
      <NavLink
        className={({ isActive }) =>
          cn(`font-medium w-full`, isActive && "text-green pointer-events-none")
        }
        prefetch="intent"
        to={`/sermons/${sermon.sermonID}/a`}
      >
        {sermon.displayTitle}
        <span className={cn("flex gap-2 ", sermon?.bibleText && "flex-col")}>
          <span className=" text-sm text-gray font-light italic">
            {sermon?.speaker?.displayName}
          </span>
          <span className="font-light text-sm">
            {formatDate(sermon?.preachDate)}
            {""}
            {sermon?.bibleText ? ` | ${sermon?.bibleText}` : null}
          </span>
        </span>
      </NavLink>
    </li>
  );
};
