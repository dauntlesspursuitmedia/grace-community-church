import { defineField, defineType } from "sanity";
import { toTitleCase } from "~/lib/toTitleCase";

export const textWithImageModule = defineType({
  name: "textWithImageModule",
  title: "Text w/ Image Module",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      type: "headingWithSubtitle",
    }),
    defineField({
      name: "titleAlign",
      title: "Heading Alignment",
      type: "string",
      options: {
        list: ["left", "center", "right"],
        layout: "radio",
        direction: "horizontal",
      },
    }),
		defineField({
			name: "imagePlacement",
			title: "Image Placement",
			type: "string",
			options: {
				list: ["left", "right"],
				layout: "radio",
				direction: "horizontal"
			}
		}),
		defineField({
			name: "image",
			type: "imageWithCaption",
			title: "Image",
		}),
		defineField({
			name: "body",
			title: "Content",
			type: "richText",
		})
  ],
	preview: {
		select: {
			media: "image",
			imagePlacement: "imagePlacement"
		},
		prepare: ({media, imagePlacement}) => {
			console.log({media, imagePlacement})
			return {
				media,
				title: `Text w/ Image Module - ${toTitleCase(imagePlacement)}`,
				subtitle: media?.caption,
			}
		}
	}
});
