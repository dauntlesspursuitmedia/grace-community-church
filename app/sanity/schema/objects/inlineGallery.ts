import { defineArrayMember, defineField, defineType } from "sanity";

export const inlineGallery = defineType({
	name: "inlineGallery",
	title: "Inline Gallery",
	type: "object",
	fields: [
		defineField({
			description: "Use this to display a gallery of overlapping images.",
			name: "images",
			title: "Images",
			type: "array",
			options: {
				layout: "grid"
			},
			of: [
				defineArrayMember({
					type: "image",
					name: "image",
					options: {
						hotspot: true
					}
				})
			]
		})
	],
	preview: {
		select: {
			media: "images"
		},
		prepare({ media }) {
			return {
				title: "Inline Gallery",
				media: media?.[0],
				subtitle: `${media?.length} images`
			}
		}
	}
})
