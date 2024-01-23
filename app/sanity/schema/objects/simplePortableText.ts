import { defineType } from "sanity";
export const simplePortableText = defineType({
  name: "simplePortableText",
  title: "Simple portable text",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [],
      lists: [],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
      },
    },
  ],
});
