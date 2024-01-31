import { z } from "zod";
import { cn } from "~/lib/misc";
import { headingWithSubtitleZ } from "~/types/shared";

export const HeadingWithSubtitle = ({level, className, title, subtitle, textAlign}: z.infer<typeof headingWithSubtitleZ> & {className?: string}) => {
	console.log({title, subtitle})
  return (
    <div style={{textAlign: textAlign ?? "left"}} className={cn("", className)}>
      <span className="text-xs uppercase font-normal tracking-[1.2px] text-yellow">{subtitle}</span>
      <h1 className="text-8xl font-semibold uppercase text-white">{title}</h1>
    </div>
  );
};
