import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import type { SanityImageSource } from "@sanity/asset-utils";
import type { PortableTextComponentProps } from "@portabletext/react";

type SanityImageAssetWithAlt = SanityImageSource & { alt?: string };
import { dataset, projectId } from "~/sanity/projectDetails";
import { cn } from "~/lib/misc";
export function SanityImage(
  props: PortableTextComponentProps<SanityImageAssetWithAlt> & {
    width: number;
    className?: string;
    blur?: number;
    height?: number;
  }
) {
  const { value, isInline, blur, width, height, className="" } = props;
  const { width: defaultWidth, height: defaultHeight } =
    getImageDimensions(value);

  if (!blur) {
    return (
      <img
        className={cn(`not-prose w-full object-cover`, className)}
        src={urlBuilder({ dataset, projectId })
          .image(value)
          .width( (width || defaultWidth) ?? 800)
          .height(height ?? defaultHeight)
          .fit("scale")
          .auto("format")
          .quality(80)
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
  return (
    <img
      className={`not-prose w-full object-cover ${props.className}`}
      src={urlBuilder({ dataset, projectId })
        .image(value)
        .width(isInline ? 100 : (width || defaultWidth) ?? 800)
        .height(height ?? defaultHeight)
        .fit("scale")
        .auto("format")
        .blur(blur || 1)
        .quality(80)
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
