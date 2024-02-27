import { lazy } from "react";


export const lookup = {
	actions: lazy(async () => {
		const { ActionGroup } = await import("~/components/modules/ActionGroup");
		return {
			default: ActionGroup,
		};
	}),
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

	richText: lazy(async () => {
		const { RichText } = await import("~/components/modules/RichText");
		return {
			default: RichText,
		};
	}),
	inlineGallery: lazy(async () => {
		const { InlineGallery } = await import("~/components/modules/InlineGallery");
		return {
			default: InlineGallery,
		};
	}),
	eventTimeWidget: lazy(async () => {
		const { EventTimeWidget } = await import(
      "~/components/modules/EventTimeWidget"
    );
    return {
      default: EventTimeWidget,
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
