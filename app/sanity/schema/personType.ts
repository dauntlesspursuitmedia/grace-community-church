import { defineField, defineType } from "sanity";

export const personType = defineType({
  name: "person",
  title: "Person",
  type: "document",

  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone",
    }),
    defineField({
      name: "image",
      type: "imageWithCaption",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "simplePortableText",
    }),
  ],
});
