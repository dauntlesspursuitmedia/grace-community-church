import groq from "groq";

export const SITE_CONFIG_QUERY = groq`
	*[_type == "siteConfig"][0]{
		title,
		url,
		address,
		services {
			_type,
			entry[] {
				day,
				time,
				_key
			}
		},
		socialLinks[]{
			_key,
			platform,
			url
		},
		mainNavigation[]{
			_id,
			_key,
			itemName,
			externalLink,
			item->{
				_id,
				title,
				_type,
				"slug":slug.current
			},
			nestedRoutes[]{
				_key,
				itemName,
				externalLink,
				item->{
					_id,
					_type,
					title,
					"slug":slug.current
				}
			}
		},
		footerText
	}
`;
