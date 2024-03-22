import { CustomSelect } from "~/routes/resources.contactForm";

export const ContactForm = () => {
  return (
    <section className="container mx-auto @container">
			<div className="flex flex-col gap-8 @lg:flex-row justify-center">

      <form >
        <h2 className="text-center">Send us a message!</h2>
				<CustomSelect />
      </form>
			<div>This is a test for the map embed</div>
      {/* <iframe
        src={`https://www.google.com/maps/embed/v1/place?q=4969%20McMinnville%20Hwy%20Manchester%2c%20TN&zoom=15&key=AIzaSyBnjnL6E1MNmfbfYNABMfBzYiS80Xv00D4&attribution_source=Google+Maps+Embed+API&attribution_web_url=https://developers.google.com/maps/documentation/embed/`}
        title="Country Barn Construction Map"
        width="100%"
        height="500"
        frameBorder="0"
      /> */}
			</div>
    </section>
  );
};
