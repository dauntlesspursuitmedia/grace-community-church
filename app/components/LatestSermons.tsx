import { Link, useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { SermonList } from "types";
import { cn } from "~/lib/misc";

export const LatestSermonsList = ({
  theme = "light",
}: {
  theme: "light" | "dark";
}) => {
  const sermonFetcher = useFetcher<Promise<SermonList>>();

  const latestSermons = sermonFetcher?.data?.results ?? [];
  const pageSize = 3;
  useEffect(() => {
    if (sermonFetcher.state === "idle" && sermonFetcher.data == null) {
      sermonFetcher.load(`/api/latestSermons?pageSize=${pageSize}`);
    }
  }, [sermonFetcher, pageSize]);

  return (
    <div className={cn(theme === "light" ? "text-white" : "text-black")}>
      <h2
        className={cn(
          "uppercase tracking-[2.4px] text-2xl font-bold leading-8",
          theme === "light" && "text-white"
        )}
      >
        Latest Sermons
      </h2>
      <ul className="list-disc list-inside">
        {latestSermons &&
          latestSermons?.map((sermon) => {
            return (
              <li key={sermon?.sermonID} className="underline ">
                <Link to={`/sermons/${sermon?.sermonID}`}>
                  {sermon?.displayTitle}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
