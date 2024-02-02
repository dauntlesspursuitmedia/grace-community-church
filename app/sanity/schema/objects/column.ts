import { defineArrayMember, defineField, defineType } from "sanity";

export const column = defineType({
  name: "column",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Modules",
      type: "array",
      of: [
        defineArrayMember({
          type: "actionGroup",
          name: "actions",
        }),
        defineArrayMember({
          type: "headingWithSubtitle",
        }),
        defineArrayMember({
          type: "imageWithCaption",
        }),
        defineArrayMember({
          type: "eventTimeWidget",
        }),
        defineArrayMember({
          type: "inlineGallery",
          name: "inlineGallery",
        }),
        defineArrayMember({
          type: "uiComponentRef",
        }),
        defineArrayMember({
          type: "reference",
          to: [{ type: "person" }, { type: "ministry" }],
          name: "person",
        }),
        defineArrayMember({
          type: "richText",
        }),
      ],
    }),
  ],
});
