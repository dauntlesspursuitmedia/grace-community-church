import { z } from "zod";
import { cn } from "~/lib/misc";
import { Card } from "./Card";
import { CardsProps } from "./modules/Cards";



export const CardRow = ({cards, fullWidth}: z.infer<typeof CardsProps>) => {
	return (
    <div
      style={{ ["--columns" as string]: cards?.length }}
      className={cn("cards", !fullWidth && "container mx-auto px-8")}
    >
      {cards?.map((card, idx) => {
        return <Card key={card?._key ?? idx} {...card} />;
      })}
    </div>
  );
}
