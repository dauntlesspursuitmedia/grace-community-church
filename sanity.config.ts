import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { frontendUrl, projectDetails } from '~/sanity/projectDetails'
import { presentationTool } from '@sanity/presentation'
import { locate } from '~/sanity/presentation/locate'
import schema from '~/sanity/schema'

export const config= defineConfig({
	...projectDetails(),
	name: "grace-community-church",
	title: "Grace Community Church",
  plugins: [structureTool(), visionTool(), presentationTool({previewUrl: frontendUrl, locate})],
	basePath: "/studio",
  schema: {
    types: schema,
  },
})
