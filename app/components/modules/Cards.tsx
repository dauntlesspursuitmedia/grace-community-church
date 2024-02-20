import { z } from "zod";
import { cardsModuleZ } from "~/types/shared";
import { HeadingWithSubtitle } from "./HeadingWithSubtitle";
import { cn } from "~/lib/misc";
import { Card } from "../Card";

export const Cards = ({
  cards,
  heading,
  fullWidth,
}: z.infer<typeof cardsModuleZ>) => {
	console.log({fullWidth, length : cards?.length})
  return (
    <section className="flex gap-16 flex-col mb-24">
      {heading && <HeadingWithSubtitle className="px-8" {...heading} />}
      <div style={{["--columns" as string]: cards?.length}}  className={cn("cards", !fullWidth && "container mx-auto px-8", )}>
        {cards?.map((card, idx) => {
          return (
						<Card key={card?._key?? idx} {...card} />
          );
        })}
      </div>
    </section>
  );
};
