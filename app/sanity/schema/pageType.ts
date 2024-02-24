import { FileBadgeIcon } from "lucide-react";
import { defineType, defineField } from "sanity";
export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: FileBadgeIcon,
  groups: [
    {
      name: "details",
      title: "Details",
    },
    {
      name: "editorial",
      title: "Editorial",
    },
  ],
  fields: [
    defineField({
      name: "route",
      type: "reference",
      to: {
        type: "route",
      },
    }),
    defineField({
      name: "pageLayouts",
      type: "pageModules",
      title: "Page Layouts",

    }),
  ],
  preview: {
    select: {
      title: "route.title",
      subtitle: "route.slug.current",
    },
    prepare: ({ title, subtitle }) => {
      return {
        title,
        subtitle: subtitle !== "/" ? `/${subtitle}` : "/",
      };
    },
  },
});
