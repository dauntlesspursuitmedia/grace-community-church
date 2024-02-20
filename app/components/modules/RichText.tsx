import { PortableText } from "@portabletext/react";
import { z } from "zod";
import { richTextModuleZ } from "~/types/shared";

export const RichText = ({content, _key}: z.infer<typeof richTextModuleZ>) => {
  return <PortableText components={{
		block: {
			normal: ({children}) => <p className="max-w-prose">{children}</p>
		}
	}} value={content}   />;
};
