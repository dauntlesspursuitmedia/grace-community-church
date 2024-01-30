import { useParams } from "@remix-run/react"

export default function PageRoute(){
	return (
		<div>
			page route
			<pre>{useParams().slug}</pre>
		</div>
	)
}
