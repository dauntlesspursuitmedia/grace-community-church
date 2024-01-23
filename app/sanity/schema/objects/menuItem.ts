import {
  ListEndIcon,
  ListIcon,
  Navigation2Icon,
} from "lucide-react";
import { defineType, defineField } from "sanity";
export const menuItem = defineType({
  name: "menuItem",
  type: "object",
  title: "Menu Item",
  icon: Navigation2Icon,
  fields: [
    defineField({
      name: "item",
      title: "Internal Route",
      type: "reference",
      to: [
        {
          type: "route",
        }
      ],
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      description:
        "If you want to link to external urls in your navigation choose this type.",
      type: "url",
    }),
    defineField({
      name: "itemName",
      title: "Menu Item Name",
      description: "You can override the default menu title here",
      type: "string",
    }),
    defineField({
      name: "nestedRoutes",
      title: "Nested Routes",
      type: "array",
      of: [{ type: "menuItem", title: "Nested Menu Item" }],
    }),
  ],
  preview: {
    select: {
      defaultTitle: "item.title",
      internalSlug: "item.slug.current",
      title: "itemName",
      externalLink: "externalLink",
      nestedRoute: "nestedRoutes",
    },
    prepare: ({
      title,
      defaultTitle,
      nestedRoute,
      internalSlug,
      externalLink,
    }) => {
      return {
        title: title ? title : defaultTitle,
        subtitle: internalSlug ? internalSlug : externalLink,
        media: nestedRoute?.length > 0 ? ListEndIcon : ListIcon,
      };
    },
  },
});
