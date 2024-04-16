import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          "fluid-text": ["sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl",
          ],
        },
      ],
    },
  },
});
export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}
