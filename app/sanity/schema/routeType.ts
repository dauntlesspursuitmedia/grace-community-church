import { Link } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const route = defineType({
	name: 'route',
	type: 'document',
	title: 'Route',
	icon: Link,
	fields: [
		defineField({
			name: 'seo',
			type: 'seo',

		}),
		defineField({
			name: 'title',
			title: 'Route Title',
			type: 'string',

		}),
		defineField({
			name: 'slug',
			type: 'slug',
			title: "Slug",
			options: {
				source: 'title',
			}
		}),
		defineField({
			name: 'page',
			title: 'Associated Page',
			type: 'reference',
			to: [{
				type: 'page'
			}]
		})
	]
})
