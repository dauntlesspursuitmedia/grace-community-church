import { defineField, defineType } from "sanity";
import { page } from "./pageType";
import { FileBadgeIcon } from "lucide-react";

export const home = defineType({
  name: "home",
  title: "Home Page",
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
			name: "title",
			type: "string",
			title: "Title",
		}),
		defineField({
			type: "pageModules",
			name: "pageLayouts",
		})
  ],

});

