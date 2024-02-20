import { HeroModuleProps } from "~/types/shared";
import { SanityImage } from "../SanityImage";
import { HeadingWithSubtitle } from "./HeadingWithSubtitle";
import { Link } from "@remix-run/react";
import { Action } from "../Action";

export const HeroModule = (props: HeroModuleProps) => {
  return (
    <section className="grid ">
      <SanityImage
        width={1900}
        height={800}
        className="col-start-1 row-start-1 col-span-full w-full h-full xl:h-auto "
        blur={50}
        value={props?.image}
      />
      <div className="col-span-full col-start-1 row-start-1 w-full h-full bg-[rgba(52,22,4,0.43)]" />
      <div className=" col-start-1 pt-48 lg:pt-36 xl:pt-24 2xl:pt-0 row-start-1 col-span-full container mx-auto grid md:grid-cols-2 md:place-content-center">
        <div className=" p-8  w-full">
					<HeadingWithSubtitle className="max-w-[375px] text-white" {...props?.heading} />
					<div className="my-8 flex gap-8">

					{props?.actions?.map((action) => {
						return (
							<Action action={action} key={action._key} />
						)
					})}
					</div>
				</div>
				{/* @Todo put section for special events here */}
      </div>
    </section>
  );
};
