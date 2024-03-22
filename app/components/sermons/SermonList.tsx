import { Series, Sermon } from "types";
import { SermonListItem } from "./SermonListItem";
import { cn } from "~/lib/misc";
import { SeriesListItem } from "./SeriesListItem";

export const SermonList = ({
  listItems,
	seriesId,
  title,
}: {
	seriesId?:string;
  title: string;
  listItems: Sermon[] | Series[];
}) => {
  return (
    <div className={cn("w-full")}>
      <h4>{title || "Latest Sermons"}</h4>
      <ul className="my-4 flex w-full flex-col gap-4 h-[660px] overflow-y-auto divide-y-[1px] divide-green-light">
        {listItems?.map((item, idx) => {
          if (item.type === "sermon" && "sermonID" in item) {
            return <SermonListItem seriesId={seriesId} key={item.sermonID} sermon={item} />;
          }
          if (item.type === "series" && "seriesID" in item) {
            return <SeriesListItem seriesId={seriesId} key={item?.seriesID} series={item} />;
          }
          return <p key={idx}>The type {item?.type} is not handled</p>;
        })}
      </ul>
    </div>
  );
};
