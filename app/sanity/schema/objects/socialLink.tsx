import type { ReactElement } from "react";
import { defineField, defineType } from "sanity";
import {
  Camera,
  Facebook,
  FileQuestion,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

interface IconArrayProps {
  [key: string]: ReactElement;
}
export const socialLink = defineType({
  title: "Social Link",
  name: "socialLink",
  type: "object",
  fields: [
    defineField({
      title: "Platform",
      name: "platform",
      type: "string",
      options: {
        list: [
          { title: "Facebook", value: "facebook" },
          { title: "Twitter", value: "twitter" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Instagram", value: "instagram" },
          { title: "SnapChat", value: "snapchat" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      title: "Url",
      name: "url",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "platform",
    },
    prepare: ({
      title,
    }: {
      title: string;
    }): { title: string; media: ReactElement } => {
      const iconArray: IconArrayProps = {
        facebook: <Facebook />,
        twitter: <Twitter />,
        linkedin: <Linkedin />,
        instagram: <Instagram />,
        snapchat: <Camera />,
      };

      return {
        title: title
          ? title.charAt(0).toUpperCase() + title.slice(1)
          : "Please choose a link",
        media: title ? iconArray[title] : <FileQuestion />,
      };
    },
  },
});
