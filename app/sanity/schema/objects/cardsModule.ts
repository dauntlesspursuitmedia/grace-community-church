import { defineArrayMember, defineField, defineType } from "sanity";

export const cardsModule = defineType({
  name: "cardsModule",
  type: "object",
  title: "Cards Module",
  fields: [
    defineField({
      name: "heading",
      description: "Optional Heading",
      type: "headingWithSubtitle",
      title: "Heading",
    }),
    defineField({
      name: "titleAlign",
      title: "Heading Alignment",
      type: "string",
      options: {
        list: ["left", "center", "right"],
        layout: "radio",
        direction: "horizontal",
      },
    }),
		defineField({
			name: "fullWidth",
			title: "Full Width",
			type: "boolean",
			description: "Whether to use full width of screen for card layout",
			initialValue: false,
		}),
    defineField({
      name: "cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
					to: {
						type: "ministry"
					}
        }),
      ],
    }),
  ],
	preview: {
		select: {
			title: "heading",
		},
		prepare: ({title}) => {
			return {
				title: "Cards Module",
				subtitle: title?.title
			}
		}
	}
});
