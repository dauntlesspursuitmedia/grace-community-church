import { defineField, defineType } from "sanity";

export const headingWithSubtitle = defineType({
  name: "headingWithSubtitle",
  title: "Heading With Subtitle",
  type: "object",
	initialValue: {
		level: "h2"
	},
  fields: [
		defineField({
			name: "subtitle",
			type: "string",
			title: "Subtitle",
			description: "Subtitle will go above title in layout"
		}),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
		defineField({
			name: "level",
			type: "string",
			title: "Heading Level",
			options: {
				list: [
					{title: "h1", value: "h1"},
					{title: "h2", value: "h2"},
					{title: "h3", value: "h3"},
					{title: "h4", value: "h4"},
					{title: "h5", value: "h5"},
					{title: "h6", value: "h6"},
				]
			}
		}),
  ],
});
