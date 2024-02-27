import { z } from "zod";
import { cardsModuleZ } from "~/types/shared";
import { HeadingWithSubtitle } from "./HeadingWithSubtitle";
import { cn } from "~/lib/misc";
import { Card } from "../Card";
import { CardRow } from "../CardRow";
import { CardList } from "../CardList";

export const CardsProps = cardsModuleZ.pick({
  cards: true,
  fullWidth: true,
});

export const Cards = ({
  cards,
  heading,
  fullWidth,
  displayType,
}: z.infer<typeof cardsModuleZ>) => {
  return (
    <section className="flex gap-16 flex-col ">
      {heading?.title && <HeadingWithSubtitle className="px-8" {...heading} />}
      {displayType === "row" ? (
        <CardRow cards={cards} fullWidth={fullWidth} />
      ) : (
        <CardList cards={cards} fullWidth={fullWidth} />
      )}
    </section>
  );
};
