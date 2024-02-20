import { useRouteLoaderData } from "@remix-run/react";
import { Clock10, MapPinned } from "lucide-react";
import { z } from "zod";
import { RootLoaderWithData } from "~/root";
import { eventTimeWidgetZ } from "~/types/shared";
import { ServiceWidget } from "../ServiceWidget";

export const EventTimeWidget = ({
  showAddress,
  useDefaultAddress,
  useDefaultServiceTimes,
  eventLocation,
  eventTimes,
  title,
}: z.infer<typeof eventTimeWidgetZ>) => {
  const rootData = useRouteLoaderData<RootLoaderWithData>("root");

  const defaultAddress = rootData?.initial?.data?.address;
  const defaultServices = rootData?.initial?.data?.services;

  return (
    <ServiceWidget
      _type="timeArray"
      title={title}
      times={useDefaultServiceTimes ? defaultServices : eventTimes}
      address={useDefaultAddress ? defaultAddress : eventLocation}
      theme="dark"
      showAddress={showAddress}
    />
  );
};
