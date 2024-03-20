import { useParams } from "@remix-run/react";
// @TODO flesh this out
export default function MinistryIdRoute() {
  return (
    <section>
      <pre>{JSON.stringify(useParams().ministryId, null, 2)}</pre>
    </section>
  );
}
