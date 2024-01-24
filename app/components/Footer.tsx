import { SiteConfigDocument } from "~/types/siteConfig"
import { Logo } from "./Logo"

export const Footer = ({address, socialLinks, services}: SiteConfigDocument) => {
	return (
		<footer className="bg-green-dark">
			<div>
			<Logo theme="light" width={450} />

			<pre>
				{JSON.stringify(
					{
						address,
						socialLinks,
						services,
					},
					null,
					2
				)}
			</pre>
			</div>
		</footer>
	)
}
