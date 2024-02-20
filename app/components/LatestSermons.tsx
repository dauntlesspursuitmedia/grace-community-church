import { cn } from "~/lib/misc";

export const LatestSermonsList = ({theme = "light"}: {theme: "light" | "dark"}) => {
  return (
    <div className={cn(theme === "light"? "text-white": "text-black")}>
      <h2 className={cn("uppercase tracking-[2.4px] text-2xl font-bold leading-8", theme === "light" && "text-white")}>Latest Sermons</h2>
      <ul className="list-disc list-inside">
        <li className="underline ">
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            Sermon Title 1
          </a>
        </li>
        <li className="underline ">
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            Sermon Title 2
          </a>
        </li>
        <li className="underline ">
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            Sermon Title 3 with a really long title
          </a>
        </li>
      </ul>
    </div>
  );
};
