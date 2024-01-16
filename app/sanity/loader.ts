import {createQueryStore } from '@sanity/react-loader'

export const {
	// Used only server side
	loadQuery,
	setServerClient,
	// Used only on client site
	useQuery,
	useLiveMode,
} = createQueryStore({client: false, ssr:true})
