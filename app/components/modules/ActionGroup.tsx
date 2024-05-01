import { z } from "zod"
import { actionGroupZ } from "~/types/shared"
import { Action } from "../Action"
import { cn } from "~/lib/misc";

export const ActionGroup = ({actions, className}: z.infer<typeof actionGroupZ> & {className?:string;}) => {
	return <div className={cn("flex gap-8 px-4 my-8", className)}>{actions?.map((action) => {
		return (
			<Action  action={action} key={action._key} />
		)
	})}</div>
}
