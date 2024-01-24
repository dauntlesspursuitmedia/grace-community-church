
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
})

export const timeArrayZ = z.object({
	_type: z.literal("timeArray"),
	entry: z.array(z.object({
		_key: z.string().nullish(),
		day: z.string().nullish(),
		time: z.string().nullish(),
	})).nullish()
})
export const socialLinkZ = z.object({
	platform: z.string().nullish(),
	url: z.string().nullish(),
})

