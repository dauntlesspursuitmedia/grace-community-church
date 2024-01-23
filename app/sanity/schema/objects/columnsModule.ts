import { defineArrayMember, defineField, defineType } from "sanity";

// spec out a columns schema in sanity
export const columnsModule = defineType({
  name: "columnsModule",
  title: "Multi-Column Module",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      type: "headingWithSubtitle",
			description: "this is an optional heading for the section"
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
      name: "columns",
      title: "Columns",
      type: "array",
      of: [
        defineArrayMember({
          type: "column",
          title: "Column",
        }),
      ],
    }),
  ],
	preview: {
		select: {
			columns: "columns"
		},
		prepare: ({columns}) =>{
			return {
				title: "Multi-Column Module",
				subtitle: `${columns?.length} Column${columns?.length > 1 ? "s" : ""}`,
			}
		}
	}
});
