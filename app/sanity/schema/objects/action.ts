import { defineField, defineType } from "sanity";

export const action = defineType({
	name: "action",
	title: "Call To Action",
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			name: "isExternal",
			title: "Is External Link?",
			type: "boolean",
			initialValue: false
		}),
		defineField({
			name: "link",
			type: "url",
			title: "External Link",
			hidden: ({parent}) => !parent.isExternal
		}),
		defineField({
			hidden: ({parent}) => parent.isExternal,
			name: "internalLink",
			type: "reference",
			title: "Internal Link",
			to: [ {type: "route"}]
		}),
		defineField({
			name: "actionType",
			title: "Style as",
			type: "string",
			options: {
				list: ["button", "link"],
				layout: "radio",
				direction: "horizontal"
			}
		}),
		defineField({
			name: "actionStyle",
			title: "Action Style",
			type: "object",
			initialValue: {
				buttonStyle: "solid"
			},
			fields: [
				defineField({
					name: "color",
					title: "Button Color",
					type: "string",
					options: {
						list: [
						{title: "Black", value: "black"},
						{title: "White", value:"white"},
						{title: "Gray", value:"gray"},
						{title: "Green", value:"green"},
						{title: "Dark Green",value: "green-dark"},
						{title: "Light Green",value: "green-light"},
						{title: "Yellow", value: "yellow"},
						{title: "Cream", value: "cream"}
						]
					}
				}),
				defineField({
					name: "buttonStyle",
					title: "Style",
					type: "string",
					options: {
						list: [ "outline", "solid"],
						layout: "radio",
						direction: "horizontal"
					}
				})
			]
		})

	],
	preview: {
		select: {
			title: "title",
			internalLink: "internalLink.slug.current",
			externalLink: "link",
			isExternal: "isExternal"
		},
		prepare({ title, internalLink, externalLink, isExternal }) {
			return {
				title,
				subtitle: !isExternal ? `/${internalLink}` : externalLink
			};
		}
	}
})
