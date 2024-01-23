import { defineField, defineType } from "sanity";

export const imageWithCaption = defineType({
  name: "imageWithCaption",
  type: "image",
  title: "Image With Caption",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "caption",
      type: "string",
      description: "Add photo creds for photographer or image caption",
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Important for SEO and accessiblity.",
    }),
  ],
});
