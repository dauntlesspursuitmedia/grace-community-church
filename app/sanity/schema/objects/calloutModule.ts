import { defineField, defineType } from "sanity";

export const callOutModule = defineType({
  name: "calloutModule",
  title: "Callout Module",
  type: "object",
  fields: [
    defineField({
      name: "backgroundColor",
      type: "string",
      title: "Background Color",
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
      name: "body",
      title: "Callout Body",
      type: "text",
    }),
    defineField({
      type: "actionGroup",
      name: "actions",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Callout Module",
        subtitle: "Callout Module",
      };
    },
  },
});
