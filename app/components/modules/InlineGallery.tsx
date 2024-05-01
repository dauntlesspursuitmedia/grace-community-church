import { z } from "zod";
import { inlineGalleryZ } from "~/types/shared";
import { SanityImage } from "../SanityImage";

export const InlineGallery = ({
  images,
  _key,
  _type,
}: z.infer<typeof inlineGalleryZ>) => {
  return (
    <div className="inline-gallery w-full">
      {images?.map((image, idx) => {
        return (
          <SanityImage
            key={idx}

						className="object-contain max-h-96 rounded-2xl shadow-md w-auto"
            value={image.asset}
            isInline={true}
          />
        );
      })}
    </div>
  );
};
