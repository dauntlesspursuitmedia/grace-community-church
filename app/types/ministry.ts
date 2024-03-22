import { z } from "zod";
import { imagePropsZ, imageWithCaptionZ, richTextModuleZ } from "./shared";

export const ministryZ = z.object({
  title: z.string(),
  description: richTextModuleZ.nullish(),
  excerpt: z.string().nullish(),
  mainImage: imagePropsZ.nullish(),
  _key: z.string().nullish(),
  _id: z.string(),
  photoGallery: z.array(imageWithCaptionZ).nullish(),
});

export type MinistryType = z.infer<typeof ministryZ>

