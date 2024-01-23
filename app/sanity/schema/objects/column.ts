import { defineField, defineType } from "sanity";

export const column = defineType({
	name: "column",
	type: "object",
	fields: [
		defineField({
			name: "body",
			title:"Content",
			type: "richText"
		})
	],
	preview: {
		select: {
			columns: "body"
		},
		prepare: ({columns}) => {
			return {
				title: `Column ${columns?.content?.length > 1 ? "s" : ""}`,
			}
		}
	}
})
