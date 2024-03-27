import { ContactForm } from "../ContactForm";


export const ContactFormSection = () => {
  return (
    <section className="container mx-auto @container">
      <div className="flex flex-col gap-8 @lg:flex-row justify-center">
        <ContactForm />
        <div>This is a test for the map embed</div>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?q=4969%20McMinnville%20Hwy%20Manchester%2c%20TN&zoom=15&key=AIzaSyByOLkDp5PQpf-IDGXeTd-JkDRm8HlZmkQ&attribution_source=Google+Maps+Embed+API&attribution_web_url=https://developers.google.com/maps/documentation/embed/`}
          title="Grace Community Church Map"
          width="100%"
          height="500"
        />
      </div>
    </section>
  );
};
