import { defineArrayMember, defineField, defineType } from "sanity";

export const heroModule = defineType({
	name: "hero",
	type: "object",
	title: "Hero Module",
	fields: [
		defineField({
			name: "image",
			title: "Hero Image",
			type: "image",
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: "heading",
			type: "headingWithSubtitle",
		}),
		defineField({
			name: "actions",
			type: "array",
			title: "Actions",
			of: [
				defineArrayMember({
					type: "action"
				})
			]
		})
	],
	preview: {
		select: {
			media: "image",
			heading: "heading"
		},
		prepare({media, heading})  {
			return {
				media,
				title: `Hero Module - ${heading?.title}`,
				subtitle: heading?.subtitle

			}
		}
	}
})
