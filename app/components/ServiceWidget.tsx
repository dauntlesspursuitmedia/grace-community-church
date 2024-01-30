import { Clock10, MapPinned } from "lucide-react";
import { z } from "zod";
import { cn } from "~/lib/misc";
import { addressZ, timeArrayZ } from "~/types/shared";

const serviceWidgetZ = timeArrayZ.extend({
  title: z.string().nullish(),
  times: timeArrayZ.nullish(),
  address: addressZ.nullish(),
  theme: z.enum(["light", "dark"]).default("light"),
});

type ServiceWidgetProps = z.infer<typeof serviceWidgetZ>;

export const ServiceWidget = ({
  title,
  times,
  address,
  theme,
}: ServiceWidgetProps) => {
  const urlEncodedAddress = encodeURIComponent(
    address?.streetAddress +
      ", " +
      address?.city +
      ", " +
      address?.state +
      " " +
      address?.zipcode || ""
  );
  return (
    <div>
      <h2 className="">{title ?? ""} </h2>
      {address && (
        <div
          className={cn(
            "flex gap-6 items-center mb-7",
            theme === "light" ? "text-white" : "text-black"
          )}
        >
          <MapPinned className="size-8 text-green" />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.google.com/maps/dir/?api=1&destination=${urlEncodedAddress}&dir_action=navigate&travelmode=driving`}
          >
            {address.streetAddress}
            <br />
            {address.city}, {address.state} {address.zipcode}
          </a>
        </div>
      )}
      {times?.entry && (
        <div className="flex gap-6 items-center">
          <Clock10 className="size-8 text-green" />
          <ul>
            {times?.entry.map((time) => {
              return (
                <li
                  className={cn(
                    "flex text-base gap-4",
                    theme === "light" ? "text-white" : "text-black"
                  )}
                  key={time._key}
                >
                  <span className="font-semibold">{time.day}:</span>
                  <span>{time.time}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
