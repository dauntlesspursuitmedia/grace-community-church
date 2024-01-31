
import { z } from "zod";
import { heroModuleZ, pageModulesZ } from "./shared";

export const homeZ = z.object({
	title: z.string(),
	pageLayouts: z.object({
		modules: pageModulesZ.nullish()
	})
})

export type HomeDocument = z.infer<typeof homeZ>
