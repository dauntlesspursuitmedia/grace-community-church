import { defineField, defineType } from "sanity";

import { Component, Contact, Newspaper } from "lucide-react";
import { toTitleCase } from "~/lib/toTitleCase";

export const uiComponentRef = defineType({
  type: "object",
  name: "uiComponentRef",
  title: "UI Component",
  icon: Component,
  fields: [
    defineField({
      description: "This is for adding a reference to specific UI components.",
      type: "string",
      name: "name",
      title: "Render Component",
      initialValue: "contactForm",
      options: {
        list: [
          { title: "Contact Form", value: "contactForm" },
          { title: "Recent Sermons", value: "recentSermons" },
        ],
        // layout: 'radio',
        direction: "horizontal",
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
    prepare({ title }) {
      const media = title === "newsletterSignup" ? Newspaper : Contact;
      const renderedTitle = `${toTitleCase(title)} Section`;
      return {
        title: renderedTitle,
        media,
      };
    },
  },
});
