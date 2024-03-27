
import { z } from "zod";
import { uiComponentRefZ } from "~/types/shared";
import { LatestSermonsList } from "../LatestSermons";
import { ContactFormSection } from "./ContactFormSection";

export const UiComponentRef = ({ name }: z.infer<typeof uiComponentRefZ>) => {


	if(name === "contactForm") return <ContactFormSection />

	return <LatestSermonsList className="container px-8 max-w-max my-8 mx-auto" theme="dark" />

};
