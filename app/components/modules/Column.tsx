import { Suspense } from "react";
import { z } from "zod";
import { cn } from "~/lib/misc";
import { lookup } from "~/lib/pageModules";
import { columnZ } from "~/types/shared";

type ColumnProps = z.infer<typeof columnZ> & {
  className?: string;
  items: z.infer<typeof columnZ>["items"];
};
export const Column = ({ items, className }: ColumnProps) => {
  // const Component = lookup[]
  return (
    <div className={cn(className, "column")}>
      <Suspense fallback="Loading...">
        {items?.map((item, idx) => {
          const Component = lookup[item._type];
          return <Component key={idx} {...item} />;
        })}
      </Suspense>
      {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
    </div>
  );
};
