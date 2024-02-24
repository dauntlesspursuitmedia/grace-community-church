import { z } from "zod";
import { cardZ } from "~/types/shared";
import { SanityImage } from "./SanityImage";
import { Link } from "@remix-run/react";
import {  ChevronsRight } from "lucide-react";

export const Card = ({
  title,
  mainImage,
	slug,
  description,
}: z.infer<typeof cardZ>) => {
  return (
    <article className=" card  ">
      {mainImage && (
        <SanityImage
          value={mainImage}
          blur={200}
          isInline={false}
          className=""
        />
      )}
      <div className="card-content">
        <h4 className="text-sideways w-max transition-all mx-0 group-hover:text-upright duration-500">
          {title}
        </h4>
        <p className="mb-4">{description?.excerpt}</p>
				<Link className="border-current border-b-[1px] flex gap-1 items-center" to={`/ministries/${slug}`}>Learn More <ChevronsRight className="size-4" /></Link>
      </div>
    </article>
  );
};
