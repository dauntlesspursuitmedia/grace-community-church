import { z } from "zod"
import { galleryModuleZ } from "~/types/shared"
import { HeadingWithSubtitle } from "./HeadingWithSubtitle"
import { SanityImage } from "../SanityImage"
import { cn } from "~/lib/misc"

export const Gallery = ({_type,images, heading}: z.infer<typeof galleryModuleZ>) => {
	return <section className="my-24 @container mx-auto max-w-[1920px]">
		<HeadingWithSubtitle className="mb-24" _type="headingWithSubtitle" {...heading} />
		<div className="grid row-auto grid-flow-dense place-items-stretch gap-4 px-4  @3xl:grid-cols-4">
			{
				images?.map((image, idx) =>
{

	return(
					<div className={cn(idx % 3 === 0 && "@3xl:col-span-2 @3xl:row-span-2", "grid")} key={idx}>
						<SanityImage className="row-start-1 col-start-1 object-cover self-stretch shadow-md shadow-black/20 rounded-md" height={800} width={800} value={image} alt={image?.asset?.alt} />
						{image?.caption && <p className="self-end bg-green text-white w-max text-[3cqi] @3xl:[font-size:min(1cqi,1rem)] px-4 py-2 col-span-1 row-start-1 col-start-1">{image.caption}</p>}
					</div>)}

				)
			}
		</div>
	</section>
}
