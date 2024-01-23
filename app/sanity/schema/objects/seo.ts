import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO and social",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Page title",
      type: "string",
      description:
        "⚡ Title for search engines and browsers. This is optional but highly encouraged",

    }),
    defineField({
      name: "metaDescription",
      title: "Page description",
      type: "text",
      description:
        "⚡ Description for search engines. Google often changes this text in search results, but its a good idea to provide one",

    }),
    defineField({
      name: "ogTitle",
      title: "Social title",
      type: "string",
      description: "Defaults to page title, but you can override it here",
    }),
    defineField({
      name: "ogDescription",
      title: "Social description",
      type: "text",
      description: "Defaults to page description, but you can override it here",
    }),
    defineField({
      name: "ogImage",
      title: "Social image",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "⚡ Image for social media sharing, Highly recommended. 1200x630px is the recommended size",
    }),
  ],
});
