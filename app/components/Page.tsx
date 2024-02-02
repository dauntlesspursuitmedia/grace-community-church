import { Suspense, lazy } from "react";
import { PageDocument } from "~/types/page";

const lookup = {
  hero: lazy(async () => {
    const { HeroModule } = await import("~/components/modules/HeroModule");
    return {
      default: HeroModule,
    };
  }),
  cardsModule: lazy(async () => {
    const { Cards } = await import("~/components/modules/Cards");
    return {
      default: Cards,
    };
  }),
  columnsModule: lazy(async () => {
    const { Columns } = await import("~/components/modules/Columns");
    return {
      default: Columns,
    };
  }),
  calloutModule: lazy(async () => {
    const { Callout } = await import("~/components/modules/Callout");
    return {
      default: Callout,
    };
  }),
  headingWithSubtitle: lazy(async () => {
    const { HeadingWithSubtitle } = await import(
      "~/components/modules/HeadingWithSubtitle"
    );
    return {
      default: HeadingWithSubtitle,
    };
  }),
  galleryModule: lazy(async () => {
    const { Gallery } = await import("~/components/modules/Gallery");
    return {
      default: Gallery,
    };
  }),
  textWithImageModule: lazy(async () => {
    const { TextWithImage } = await import(
      "~/components/modules/TextWithImage"
    );
    return {
      default: TextWithImage,
    };
  }),
  uiComponentRef: lazy(async () => {
    const { UiComponentRef } = await import(
      "~/components/modules/UiComponentRef"
    );
    return {
      default: UiComponentRef,
    };
  }),
};

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
