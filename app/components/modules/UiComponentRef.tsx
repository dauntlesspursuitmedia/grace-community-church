import { lookup } from "~/lib/pageModules";
import { ContactForm } from "../ContactForm";
import { z } from "zod";
import { uiComponentRefZ } from "~/types/shared";
import { LatestSermonsList } from "../LatestSermons";

export const UiComponentRef = ({ name }: z.infer<typeof uiComponentRefZ>) => {


	if(name === "contactForm") return <ContactForm />

	return <LatestSermonsList className="container px-8 my-8 mx-auto" theme="dark" />

};
