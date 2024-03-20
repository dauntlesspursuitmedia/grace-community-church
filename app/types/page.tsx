import { z } from "zod";
import { pageModulesZ, routeStubZ } from "./shared";

export const pageZ = z.object({
	_type: z.literal("page"),
	route: routeStubZ.nullish(),
	pageLayouts: z.object({modules: pageModulesZ.nullish(),})
})

export type PageDocument = z.infer<typeof pageZ>
