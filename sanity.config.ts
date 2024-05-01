import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { frontendUrl, projectDetails } from '~/sanity/projectDetails'
// import { presentationTool } from '@sanity/presentation'
import { locate } from '~/sanity/presentation/locate'
import schema from '~/sanity/schema'
import { structure } from '~/sanity/structure'
import {media} from 'sanity-plugin-media'
import {simplerColorInput} from 'sanity-plugin-simpler-color-input'
// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["siteConfig", "home"])
export const config = defineConfig({
  ...projectDetails(),
  name: "grace-community-church",
  title: "Grace Community Church",
  plugins: [
    structureTool({structure: structure}),
    visionTool(),
		media(),
    
    // presentationTool({ previewUrl: frontendUrl, locate }),
  ],
  basePath: "/studio",
  schema: {
    types: schema,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // for singleton types, filter out actions that are not explicity listed in the
    // `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
