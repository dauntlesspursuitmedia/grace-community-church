import { PortableText } from "@portabletext/react";
import { z } from "zod";
import { richTextModuleZ } from "~/types/shared";

export const RichText = ({content, _key}: z.infer<typeof richTextModuleZ>) => {
  return <div className="container px-4 rich-text mx-auto prose mb-24">
		<PortableText components={{
				block: {
					normal: ({children}) => <p className="max-w-prose">{children}</p>
				},
				types: {
					person: (props) => {
						const {value, ...rest} = props
						const {person} = value

						return (
						<div className="not-prose">
							<div>
								<span className="uppercase text-xs tracking-widest text-yellow">
									{person?.title}
								</span>
								<h4 className="font-bold tracking-widest">{person.name}</h4>
							</div>
							<div className="prose-p:max-w-prose">
								<PortableText
									value={person?.bio}
									components={{
										block: {
											normal: ({ children }) => (
												<p className="max-w-prose mb-6">{children}</p>
											),
										},
									}}
								/>
								{person?.email && (
									<a
										href={`mailto:${person.email}`}
										className="border-black border-[1px] text-black  hover:bg-black hover:border-black hover:text-white	focus:text-white focus:bg-black focus:border-black uppercase font-semibold tracking-[1.6px] p-4 transition-colors shadow-sm duration-150 ease-in-out hover:shadow-md inline-block"
										target="_blank"
										rel="noreferrer"
									>
										Contact
									</a>
								)}
							</div>
						</div>
					);
					}
				}
			}} value={content} />
	</div>;
};
