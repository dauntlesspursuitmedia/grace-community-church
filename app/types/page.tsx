import { z } from "zod";
import { pageModulesZ } from "./shared";

export const pageZ = z.object({
	_type: z.literal("page"),
	pageLayouts: z.object({modules: pageModulesZ.nullish(),})
})

export type PageDocument = z.infer<typeof pageZ>
