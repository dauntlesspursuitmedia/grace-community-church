import { z } from "zod"
import { actionGroupZ } from "~/types/shared"
import { Action } from "../Action"

export const ActionGroup = ({actions}: z.infer<typeof actionGroupZ>) => {
	return <div className="flex gap-8 my-8">{actions?.map((action) => {
		return (
			<Action  action={action} key={action._key} />
		)
	})}</div>
}
