import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import type { SanityImageSource } from "@sanity/asset-utils";
import type { PortableTextComponentProps } from "@portabletext/react";


type SanityImageAssetWithAlt = SanityImageSource & { alt?: string };
import { dataset, projectId } from "~/sanity/projectDetails"
export function SanityImage(
  props: PortableTextComponentProps<SanityImageAssetWithAlt> & {
    width: number;
    className?: string;
		blur?:number
  }
) {
  const { value, isInline, blur, width, height } = props;
  const { width: defaultWidth, height: defaultHeight } = getImageDimensions(value);
	console.log({props})
  return (
    <img
      className={`not-prose w-full object-contain ${props.className}`}
      src={urlBuilder({dataset, projectId})
        .image(value)
        .width(isInline ? 100 : (width || defaultWidth) ?? 800).height(height ?? defaultHeight)
        .fit("scale")
        .auto("format")
				.blur(blur || 0)
        .quality(100)
        .url()}
      alt={value.alt || ""}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? "inline-block" : "block",

        // Avoid jumping around with aspect-ratio CSS property
        // aspectRatio: 1600 / 900,
      }}
    />
  );
}
