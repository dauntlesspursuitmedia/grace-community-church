import { z } from "zod";
import { cn } from "~/lib/misc";
import { headingWithSubtitleZ } from "~/types/shared";
export const headingLevels = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
};

const alignment = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};
export const HeadingWithSubtitle = ({
  level,
  className,
  title,
  subtitle,
  textAlign = "left",
}: z.infer<typeof headingWithSubtitleZ> & { className?: string }) => {
  const titleLevel = {
    h1: <h1>{title}</h1>,
    h2: <h2>{title}</h2>,
    h3: <h3>{title}</h3>,
    h4: <h4>{title}</h4>,
    h5: <h5>{title}</h5>,
    h6: <h6>{title}</h6>,
    DEFAULT: "h1",
  };
	console.log({level})
  return (
    <div className="container mx-auto heading-w-subtitle-wrapper">
      <div
        // style={{ textAlign: textAlign ?? "left" }}
        className={cn(
          "flex text-balance flex-col w-max px-4  max-w-md heading-w-subtitle",
          alignment[textAlign ?? "left"],
					level === "h1" && "max-w-max w-full",
          className
        )}
        role="heading"
        aria-level={headingLevels[level as keyof typeof headingLevels] || 1}
        // aria-level={level || "h1"}
      >
        <span className="text-xs inline-block text-left uppercase font-normal tracking-[1.2px] text-yellow">
          {subtitle}
        </span>
        {titleLevel[(level as keyof typeof titleLevel) || "DEFAULT"]}
      </div>
    </div>
  );
};
