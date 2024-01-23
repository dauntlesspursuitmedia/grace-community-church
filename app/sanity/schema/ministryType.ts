import { defineArrayMember, defineField, defineType } from "sanity";

export const ministryType = defineType({
	name: "ministry",
	title:"Ministry",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			options: {
				source: "title",
			}
		}),
		defineField({
			name: "description",
			type: "richText",
			title: "Description",
		}),
		defineField({
			name: "mainImage",
			type: "image",
			title: "Image",
			options: {
				hotspot: true,
			}
		}),
		defineField({
			name: "photoGallery",
			type: "array",
			options: {
				layout: "grid",
				modal: {
					type: "dialog",
					width: "auto"
				}
			},
			of: [
				defineArrayMember({
					type: "imageWithCaption"
				})
			]
		})
	]
})
