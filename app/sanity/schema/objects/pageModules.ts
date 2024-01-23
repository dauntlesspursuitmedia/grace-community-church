import { defineField, defineType } from "sanity";

export const pageModules = defineType({
  name: "pageModules",
  type: "object",
  fields: [
    defineField({
      name: "modules",
      type: "array",
      title: "Modules",
      of: [
        {
          type: "hero",
        },
				{type: "headingWithSubtitle"},
        {
          type: "richText",
        },
        {
          type: "galleryModule",
        },
        {
          type: "textWithImageModule",
        },
        { type: "cardsModule" },
        { type: "calloutModule" },
        {
          type: "columnsModule",
        },
        {
          type: "uiComponentRef",
        },
      ],
    }),
  ],
});
