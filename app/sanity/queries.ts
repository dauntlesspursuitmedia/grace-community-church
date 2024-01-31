import groq from "groq";

export const IMAGE_QUERY = groq`
		crop {
			bottom,
			left,
			right,
			top
		},
		hotspot {
			height,
			width,
			x,
			y
		},
	asset->{
		_ref,
		_id,
		assetId,
		metadata {
			lqip,
		},
	}
`;
export const PAGE_MODULES_QUERY = groq`
	_type,
	_type == "hero" => {
		_type,
		_key,
		actions[] {
			actionType,
			isExternal,
			actionStyle {
				color,
				buttonStyle
			},
			_type,
			_key,
			title,
			internalLink->{
				"slug":slug.current,
			},

		},
		image {
			${IMAGE_QUERY}
		},
		heading {
			level,
			subtitle,
			_type,
			title
		}
	},
	_type == "headingWithSubtitle" => {},
	_type == "richText" => {},
	_type == "galleryModule" => {},
	_type == "textWithImageModule" => {},
	_type == "cardsModule" => {},
	_type == "calloutModule" => {},
	_type == "columnsModule" => {},
	_type == "uiComponentRef" => {}
`
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

export const HOME_PAGE_QUERY = groq`
	*[_type == "home"][0]{
		title,
		pageLayouts {
			modules[] {
				${PAGE_MODULES_QUERY}
			}
		}
	}
`;
