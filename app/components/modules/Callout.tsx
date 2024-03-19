import { z } from "zod";
import { calloutModuleZ } from "~/types/shared";
import { ActionGroup } from "./ActionGroup";
import { cn } from "~/lib/misc";

export const Callout = ({
  backgroundColor,
  actions,
  body,
}: z.infer<typeof calloutModuleZ>) => {
  return (
    <section
      className={cn(
        "container mx-auto my-24 flex gap-4 px-8 text-center flex-col  items-center justify-center",
        actions?.actions?.length === 1 && "md:flex-row md:gap-8"
      )}
    >
      {body && (
        <p className="prose mb-0 text-2xl italic w-full max-w-sm">{body}</p>
      )}
      <ActionGroup
        className="my-0"
        _type="actions"
        actions={actions?.actions}
      />
    </section>
  );
};
