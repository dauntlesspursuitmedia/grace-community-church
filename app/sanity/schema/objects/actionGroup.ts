import { Link, Paperclip } from "lucide-react";
import { defineField } from "sanity";

export const actionGroup = defineField({
  name: "actionGroup",
  type: "object",
  fields: [
    defineField({
      type: "array",
      name: "actions",
			validation: (Rule) => Rule.length(2),
      of: [{ type: "action" }],
    }),
  ],
	preview: {
		select: {
			data: "actions",
			title1: "actions.0.title",
			title2: "actions.1.title",
		},
		prepare: ({ data }) => {
      // Converts the data object values into an array
      const items: any[] = Array.from(Object.values(data));

			return {
				title: items.reduce((acc, item, idx) => {

					return  `${acc} ${idx === 0 ? "": "|"} ${item?.title}` },""),
				subtitle:items?.length + " Actions",
				media: Link
			};
		}
	}
});
