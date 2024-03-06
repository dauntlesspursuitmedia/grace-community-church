import { actionZ } from "~/types/shared";
import { z } from "zod";
import { Link } from "@remix-run/react";
import { cn } from "~/lib/misc";

const buttonColor = {
  yellow:
    "first:bg-yellow first:border-0 first:hover:bg-yellow-lighter first:focus:bg-yellow-lighter hover:text-black text-white",
		"dark-green": "bg-green-dark text-white hover:bg-green hover:text-white focus:text-white focus:bg-green focus:border-green-light",
		black: "bg-black text-white hover:bg-black/60 hover:text-white focus:text-white  focus:bg-black/60",
		green: "bg-green-dark"
} as const;

const outlineStyles = {
  yellow: "",
  green:
    "border-green border-[1px] text-green  hover:bg-green hover:border-green hover:text-black	focus:text-black focus:bg-green focus:border-green",
  white:
    "border-white border-[1px] text-white  hover:bg-white hover:border-white hover:text-black	focus:text-black focus:bg-white focus:border-white",
  black:
    "border-black border-[1px] text-black  hover:bg-black hover:border-black hover:text-white	focus:text-white focus:bg-black focus:border-black",
};
export const Action = ({ action }: { action: z.infer<typeof actionZ> }) => {
  if (action.isExternal) {
    return (
      <a
        href={action.externalLink || ""}
        target="_blank"
        rel="noopener noreferrer"
        className="first:bg-yellow first:border-0 first:hover:bg-yellow-lighter first:focus:bg-yellow-lighter p-4 border-white border-[1px] text-white"
      >
        {action.title}
      </a>
    );
  }

  return action?.actionType === "button" ? (
    <Link
      to={action.internalLink?.slug ?? ""}
      prefetch="intent"
      className={cn(
        "uppercase inline-block no-underline font-semibold tracking-[1.6px] p-4 transition-colors shadow-sm duration-150 ease-in-out hover:shadow-md",
        action.actionStyle?.buttonStyle === "solid"
          ? buttonColor[action.actionStyle?.color as keyof typeof buttonColor]
          : outlineStyles[
              action.actionStyle?.color as keyof typeof outlineStyles
            ]
      )}
      key={action._key}
    >
      {action.title}
    </Link>
  ) : (
    <Link
      to={action.internalLink?.slug ?? ""}
      prefetch="intent"
      className={cn(
        "underline font-sans hover:bg-green"
      )}
      key={action._key}
    >
      {action.title}
    </Link>
  );
};
