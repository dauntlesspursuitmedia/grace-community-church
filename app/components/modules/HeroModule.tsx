import { HeroModuleProps } from "~/types/shared";
import { SanityImage } from "../SanityImage";
import { HeadingWithSubtitle } from "./HeadingWithSubtitle";
import { Link } from "@remix-run/react";

export const HeroModule = (props: HeroModuleProps) => {
	console.log(props.heading)
  return (
    <section className="grid">
      <SanityImage
        width={1900}
        height={800}
        className="col-start-1 row-start-1 col-span-full"
        blur={50}
        value={props?.image}
      />
      <div className="col-span-full col-start-1 row-start-1 w-full h-full bg-[rgba(52,22,4,0.43)]" />
      <div className=" col-start-1 row-start-1 col-span-full container mx-auto grid grid-cols-2 place-content-center">
        <div className="">
					<HeadingWithSubtitle className="w-[375px]" {...props?.heading} />
					<div className="my-8 flex gap-8">

					{props?.actions?.map((action) => {
						return (
							<Link to={action.internalLink?.slug ?? ""} prefetch="intent" className="first:bg-yellow first:border-0 first:hover:bg-yellow-lighter first:focus:bg-yellow-lighter p-4 border-white border-[1px] text-white uppercase tracking-[1.6px] hover:bg-white hover:border-white hover:text-black	focus:text-black focus:bg-white focus:border-white transition-colors shadow-sm duration-150 ease-in-out hover:shadow-md" key={action._key}>
								{action.title}
							</Link>
						)
					})}
					</div>
				</div>
				{/* @Todo put section for special events here */}
      </div>
    </section>
  );
};
