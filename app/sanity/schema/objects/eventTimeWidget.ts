import { defineField, defineType } from "sanity";
import { address } from "./address";

export const eventTimeWidget = defineType({
  name: "eventTimeWidget",
  title: "Service/Meeting Widget",
  type: "object",
	fieldsets: [{name: "address", title:"Address"}, {name: "toggles", title: "Widget Options", options: {columns: 2, collapsible: false}}],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Widget Title",
    }),
		defineField({
			name: "showAddress",
			description: "if checked, you can add a special address for the event",
			type: "boolean",
			title: "Show Address",
			initialValue: false,
			fieldset: "toggles",
		}),
		defineField({
			fieldset: "toggles",
			name: "useDefaultServiceTimes",
			type: "boolean",
			title: "Use Default Service Times?",
			description:
				"if checked, this will use the default service times setup in the settings document",
				initialValue: true,
		}),
    defineField({
			name: "eventTimes",
      type: "timeArray",
      title: "Event Times",
      hidden: ({ parent }) => !!parent?.useDefaultServiceTimes,
    }),
		defineField({
			fieldset: "address",
			name: "useDefaultAddress",
			hidden: ({ parent }) => !parent?.showAddress,
			type: "boolean",
			title: "Use Default Address?",
			initialValue: false,
			description: "if checked, this will use the default address setup in the settings document",
		}),
    defineField({
			fieldset: "address",
      name: "eventLocation",
      type: "address",
      title: "Location",
      hidden: ({ parent }) => !parent?.showAddress || !!parent?.useDefaultAddress ,
    }),
  ],
});
