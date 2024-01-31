import { textWithImageModule } from "./../sanity/schema/objects/textWithImageModule";

import { z } from "zod";

export const routeStubZ = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  _type: z.string().nullish(),
  seo: z
    .object({
      metaTitle: z.string().nullish(),
      metaDescription: z.string().nullish(),
      ogTitle: z.string().nullish(),
      ogDescription: z.string().nullish(),
      ogImage: z.any().nullish(),
    })
    .nullish(),
});
export const menuItemZ = z.object({
  _key: z.string(),
  _type: z.string().nullish(),
  item: routeStubZ.nullish(),
  externalLink: z.string().nullish(),
  itemName: z.string().nullish(),
});

export const addressZ = z.object({
  streetAddress: z.string().nullish(),
  city: z.string().nullish(),
  state: z.string().nullish(),
  zipcode: z.string().nullish(),
});

export const timeArrayZ = z.object({
  _type: z.literal("timeArray"),
  entry: z
    .array(
      z.object({
        _key: z.string().nullish(),
        day: z.string().nullish(),
        time: z.string().nullish(),
      })
    )
    .nullish(),
});
export const socialLinkZ = z.object({
  platform: z.string().nullish(),
  url: z.string().nullish(),
});
export const imagePropsZ = z.object({
  asset: z
    .object({
      _ref: z.string().nullish(),
      _id: z.string().nullish(),
      assetId: z.string().nullish(),
      metadata: z.object({
        lqip: z.string().nullish(),
        isOpaque: z.boolean().nullish(),
      }),
    })
    .nullish(),
		crop: z
			.object({
				bottom: z.number(),
				left: z.number(),
				right: z.number(),
				top: z.number(),
			})
			.nullish(),
		hotspot: z.object({
			height: z.number(),
			width: z.number(),
			x: z.number(),
			y: z.number(),
		}).nullish(),
});

export const headingWithSubtitleZ = z.object({
  _type: z.literal("headingWithSubtitle"),
  title: z.string().nullish(),
  subtitle: z.string().nullish(),
  level: z.string().nullish(),
  textAlign: z.enum(["left", "right", "center"]).default("left").nullish(),
});

export const actionZ = z.object({
  _type: z.literal("action"),
  actionType: z.string().nullish(),
  isExternal: z.boolean().nullish(),
  actionStyle: z
    .object({
      color: z.string().nullish(),
      buttonStyle: z.string().nullish(),
    })
    .nullish(),
  title: z.string().nullish(),
  internalLink: z
    .object({
      slug: z.string().nullish(),
    })
    .nullish(),
  externalLink: z.string().nullish(),
  _key: z.string().nullish(),
});

export const heroModuleZ = z.object({
  _type: z.literal("hero"),
  image: imagePropsZ,
  heading: headingWithSubtitleZ,
  actions: z.array(actionZ).nullish(),
});

export const columnsModuleZ = z.object({
  _type: z.literal("columnsModule"),
  columns: z
    .array(
      z.object({
        _type: z.literal("column"),
        heading: headingWithSubtitleZ.nullish(),
        body: z.array(z.any()).nullish(),
      })
    )
    .nullish(),
});

export const galleryModuleZ = z.object({
  _type: z.literal("galleryModule"),
});

export const cardsModuleZ = z.object({
  _type: z.literal("cardsModule"),
});

export type TextWithImageModuleProps = z.infer<typeof textWithImageModuleZ>;

const textWithImageModuleZ = z.object({
  _type: z.literal("textWithImageModule"),
});

export const pageModulesZ = z.array(
  z.discriminatedUnion("_type", [
    heroModuleZ,
    cardsModuleZ,
    columnsModuleZ,
    galleryModuleZ,
    textWithImageModuleZ,
  ])
);

export type HeroModuleProps = z.infer<typeof heroModuleZ>;
