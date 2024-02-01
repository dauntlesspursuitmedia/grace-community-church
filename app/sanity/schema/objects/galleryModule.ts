import { defineArrayMember, defineField, defineType } from "sanity";

export const galleryModule = defineType({
	name: "galleryModule",
	type: "object",
	title: "Gallery Module",
	fields: [
		defineField({
			name: "heading",
			type: "headingWithSubtitle",
		}),
		defineField({
			name: "images",
			type: "array",
			options: {
				layout: "grid"
			},
			of: [
				defineArrayMember({
					type: "imageWithCaption"
				})
			]
		})
	],
	preview: {
		select: {
			title: "heading.title",
			subtitle: "heading.subtitle",
			media: "images",
		},
		prepare: ({ title, media }) => {
			return {
				title: "Gallery Module",
				subtitle: title,
				media: media?.[0]
			}
		}

	}
})
