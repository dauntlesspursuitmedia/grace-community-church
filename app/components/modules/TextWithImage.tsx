import { TextWithImageModuleProps } from "~/types/shared";
import { SanityImage } from "../SanityImage";
import { cn } from "~/lib/misc";
import { RichText } from "./RichText";

export const TextWithImage = ({heading, imagePlacement, image,body }: TextWithImageModuleProps) => {

  return <article className=" px-8 container mx-auto @container mt-16 mb-36 last:mb-16">
		<div className="grid gap-8 @2xl:gap-16 @2xl:grid-cols-2">
			<figure className={cn(imagePlacement === "left" ? "@2xl:col-start-1" : "@2xl:col-start-2", "@2xl:row-start-1")}>
				<SanityImage value={image} className={cn(" w-full h-full rounded-xl shadow-black/30 shadow-xl")} width={780} height={780}/>
				{image?.caption && <figcaption className="text-center text-gray pt-1">{image?.caption}</figcaption>}
			</figure>
			<div className={cn("mt-8 @2xl:mt-12 @2xl:row-start-1", imagePlacement === "left" ? "@2xl:col-start-2": "@2xl:col-start-1")}>
				<RichText content={body?.content || []} _type={body?._type ?? "richText"} />

			</div>
		</div>
	</article>;
};
