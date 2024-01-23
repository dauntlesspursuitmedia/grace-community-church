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
