import { ListChecksIcon, Paperclip } from "lucide-react";
import {  defineField, defineType } from "sanity";

export const richText = defineType({
  title: "Rich Text",
  type: "object",
  name: "richText",
  icon: ListChecksIcon,
  fields: [
    defineField({
      name: "content",
      title: "Rich Text",
      type: "array",
      of: [
				{type: "actionGroup", title: "Action Group"},
        { type: "headingWithSubtitle" },
        { type: "imageWithCaption" },
        { type: "eventTimeWidget" },
				{type: "inlineGallery"},
        { type: "uiComponentRef" },
        { type: "reference", to: { type: "person" }, name: "person" },
        { type: "reference", to: { type: "ministry" }, name: "ministry" },
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
            { title: "Code", value: "code" },
          ],

          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "link",
                fields: [
                  {
                    name: "url",
                    type: "url",
                    validation: (Rule) =>
                      Rule.regex(
                        /https:\/\/(www\.|)(portabletext\.org|sanity\.io)\/.*/gi,
                        {
                          name: "internal url",
                          invert: true,
                        }
                      ).warning(
                        `This is not an external link. Consider using internal links instead.`
                      ),
                  },
                ],
              },
              {
                title: "Internal link to another document",
                name: "internalLink",
                type: "reference",
                icon: Paperclip,
                description: "Locate a document you want to link to",
                to: [{ type: "page" }, { type: "route" }],
              },
            ],
          },
        },
      ],
    }),
  ],
});
