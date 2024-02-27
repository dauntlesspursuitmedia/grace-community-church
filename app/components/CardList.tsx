import { z } from "zod";
import { CardsProps } from "./modules/Cards";
import { cn } from "~/lib/misc";
import { SanityImage } from "./SanityImage";
import { PortableText } from "@portabletext/react";
import { CameraOffIcon } from "lucide-react";
import { Action } from "./Action";

export const CardList = ({ cards, fullWidth }: z.infer<typeof CardsProps>) => {
  return (
    <div
      className={cn(
        "@container my-8",
        !fullWidth && "grid mx-auto  container  px-8 sm:px-0 gap-24"
      )}
    >
      {cards?.map((card, idx) => {
        return (
          <article
            className="flex flex-col gap-8 @xl:flex-row justify-center @sm:items-stretch"
            key={idx}
          >
            {card?.mainImage ? (
              <SanityImage
                className="w-full object-cover @xl:max-w-sm shadow-md shadow-black/30"
                value={card?.mainImage}
              />
            ) : (
              <div className="bg-cream-dark shadow-sm shadow-black/20 grid place-content-center self-stretch w-full object-cover aspect-video @xl:max-w-sm ">
                <CameraOffIcon className="size-16" />
              </div>
            )}
            <div className="prose w-full max-w-max prose-p:max-w-prose">
              {card?.title && <h2 className="text-2xl">{card?.title}</h2>}
              <PortableText value={card?.description?.content || []} />
              {card?.slug && (
                <Action
                  action={{
                    _type: "action",
                    actionType: "button",
                    internalLink: { slug: `/ministries/${card.slug}` },
                    actionStyle: {
                      buttonStyle: "solid",
                      color: "black",
                    },
                    title: "Sign me up",
                  }}
                />
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};
