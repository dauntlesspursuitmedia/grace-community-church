import urlBuilder from "@sanity/image-url";
import { projectDetails } from "~/sanity/projectDetails";

export const urlFor = (source: any) => urlBuilder(projectDetails()).image(source);
