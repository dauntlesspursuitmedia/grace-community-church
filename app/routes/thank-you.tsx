import { MetaFunction } from "@remix-run/react";
import { LatestSermonsList } from "~/components/LatestSermons";

export const meta: MetaFunction = () => {
	return [
		{
      title: "Thank You | Grace Community Church",
		},
		{
			name: "robots", content: "noindex, nofollow"
		}
	]
}
export default function ThankYouRoute() {
    return (
        <div className="mx-auto container flex flex-col gap-8 items-center justify-center">
            <h3 className="text-center">Thank you for your submission!</h3>
            <p className="prose">We will be in touch shortly.</p>

            <LatestSermonsList className="my-32" theme="dark"  />
        </div>
    )
}
