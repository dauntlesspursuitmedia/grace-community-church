import { PortableTextBlock } from "sanity";
import { z } from "zod";

export const PortableTextZ: z.ZodType<PortableTextBlock> = z.any();

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
      alt: z.string().nullish(),
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
  hotspot: z
    .object({
      height: z.number(),
      width: z.number(),
      x: z.number(),
      y: z.number(),
    })
    .nullish(),
});

export const headingWithSubtitleZ = z.object({
  _type: z.literal("headingWithSubtitle"),
  title: z.string().nullish(),
  subtitle: z.string().nullish(),
  _key: z.string().nullish(),
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
export const actionGroupZ = z.object({
  _type: z.literal("actions"),
  actions: z.array(actionZ).nullish(),
});

export const imageWithCaptionZ = imagePropsZ.extend({
  _type: z.literal("imageWithCaption"),
  caption: z.string().nullish(),
});

export const eventTimeWidgetZ = z.object({
  _type: z.literal("eventTimeWidget"),
  _key: z.string().nullish(),
  title: z.string().nullish(),
  showAddress: z.boolean().default(false),
  useDefaultServiceTimes: z.boolean().default(true),
  eventTimes: timeArrayZ.nullish(),
  useDefaultAddress: z.boolean().default(false),
  eventLocation: addressZ.nullish(),
});

export const inlineGalleryZ = z.object({
  _type: z.literal("inlineGallery"),
  _key: z.string().nullish(),
  images: z.array(imagePropsZ).nullish(),
});

export const uiComponentRefZ = z.object({
  _type: z.literal("uiComponentRef"),
  _key: z.string().nullish(),
  name: z
    .enum(["contactForm", "registrationForm", "recentSermons"])
    .default("contactForm"),
});
export const heroModuleZ = z.object({
  _type: z.literal("hero"),
  _key: z.string().nullish(),
  image: imagePropsZ,
  heading: headingWithSubtitleZ,
  actions: z.array(actionZ).nullish(),
});

export const richTextModuleZ = z.object({
  _type: z.literal("richText"),
  content: z.array(PortableTextZ),
  excerpt: z.string().nullish(),
  _key: z.string().nullish(),
});

export const columnZ = z.object({
  _key: z.string().nullish(),
  _type: z.literal("column"),
  items: z
    .array(
      z.discriminatedUnion("_type", [
        actionGroupZ,
        headingWithSubtitleZ,
        imageWithCaptionZ,
        eventTimeWidgetZ,
        inlineGalleryZ,
        uiComponentRefZ,
        richTextModuleZ,
      ])
    )
    .nullish(),
});

export const columnsModuleZ = z.object({
  _type: z.literal("columnsModule"),
  columns: z.array(columnZ),
  titleAlign: z.enum(["left", "right", "center"]).default("left").nullish(),
  heading: headingWithSubtitleZ.nullish(),
});

export const calloutModuleZ = z.object({
  _type: z.literal("calloutModule"),
  _key: z.string().nullish(),
  body: z.string().nullish(),
  backgroundColor: z.string().nullish(),
  actions: z.object({ actions: z.array(actionZ).nullish() }).nullish(),
});

export const galleryModuleZ = z.object({
  _type: z.literal("galleryModule"),
  images: z.array(imageWithCaptionZ).nullish(),
  heading: headingWithSubtitleZ.nullish(),
});
export const cardZ = z.object({
  _key: z.string().nullish(),
  _type: z.literal("ministry"),
  title: z.string().nullish(),
  slug: z.string().nullish(),
  mainImage: imagePropsZ.nullish(),
  photoGallery: z.array(imageWithCaptionZ).nullish(),
  description: richTextModuleZ.nullish(),
});
export const cardsModuleZ = z.object({
  _type: z.literal("cardsModule"),
  heading: headingWithSubtitleZ.nullish(),
  displayType: z.enum(["row", "list"]).default("row").nullish(),
  fullWidth: z.boolean().default(false),
  cards: z.array(cardZ).nullish(),
});

export type TextWithImageModuleProps = z.infer<typeof textWithImageModuleZ>;

const textWithImageModuleZ = z.object({
  _type: z.literal("textWithImageModule"),
  heading: headingWithSubtitleZ.nullish(),
  imagePlacement: z.enum(["left", "right"]).default("left").nullish(),
  image: imageWithCaptionZ.nullish(),
  body: richTextModuleZ.nullish(),
});

export const pageModulesZ = z.array(
  z.discriminatedUnion("_type", [
    heroModuleZ,
    cardsModuleZ,
    columnsModuleZ,
    richTextModuleZ,
    calloutModuleZ,
    headingWithSubtitleZ,
    galleryModuleZ,
    textWithImageModuleZ,
    uiComponentRefZ,
  ])
);

export type HeroModuleProps = z.infer<typeof heroModuleZ>;
