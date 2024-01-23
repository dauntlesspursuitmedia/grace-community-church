import { defineField, defineType } from "sanity";

export const address = defineType({
  name: "address",
  title: "Address",
  type: "object",
  fieldsets: [{ name: "address", options: { columns: 3, collapsible: false } }],
  fields: [
    defineField({
      title: "Street Address",
      type: "string",
      name: "streetAddress",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "City",
      type: "string",
      name: "city",
      fieldset: "address",
    }),
    defineField({
      title: "State",
      type: "string",
      name: "state",
      fieldset: "address",
    }),
    defineField({
      title: "Zipcode",
      type: "string",
      name: "zipcode",
      fieldset: "address",
    }),
  ],
});
