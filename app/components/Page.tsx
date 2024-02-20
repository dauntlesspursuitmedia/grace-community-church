import { Suspense, lazy } from "react";
import { lookup } from "~/lib/pageModules";
import { PageDocument } from "~/types/page";



export const Page = ({
  pageLayouts,
}: {
  pageLayouts: PageDocument["pageLayouts"];
}) => {
  return (
    <>
      {/* <pre>{JSON.stringify(pageLayouts, null, 2)}</pre> */}
      {pageLayouts?.modules?.map((module, idx) => {
        const Component = lookup[module._type];

        return (
          <Suspense key={idx} fallback={`Loading ${module._type}`}>
            <Component key={module._key} {...module} />
          </Suspense>
        );
      })}
    </>
  );
};
