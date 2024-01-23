import { Clock } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const timeArray = defineType({
	name: "timeArray",
	title: "Time Array",
	type: "object",
	fields:[
		defineField({
			name: "entry",
			title: "",
			type: "array",
			of: [
				defineArrayMember({
					type: "dayAndTime"
				}),
			]
		})
	]
})

export const dayAndTime = defineType({
	name: "dayAndTime",
	type: "object",
	fields: [
		defineField({
			name: "day",
			type: "string",
			title: "Day"
		}),
		defineField({
			name: "time",
			type: "string",
			title: "Time"
		})
	],
	preview: {
		select: {
			title: "day",
			subtitle: "time",
		},
		prepare: ({ title, subtitle }) => {
			return {
				title,
				subtitle,
				media: Clock
			}
		}
	}
})
