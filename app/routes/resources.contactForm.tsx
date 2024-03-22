import { useFetcher } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@vercel/remix";
import { useEffect } from "react";
import { z } from "zod";
import { loadQuery } from "~/sanity/loader.server";
import { ALL_MINISTRIES } from "~/sanity/queries";
import { MinistryType, ministryZ } from "~/types/ministry";
import Select from "react-select";
import {useField useControlField} from 'remix-validated-form'
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const data = await loadQuery<MinistryType[]>(ALL_MINISTRIES).then((res) => ({
    ...res,
    data: res
      ? z.array(ministryZ.pick({ title: true, _id: true })).parse(res.data)
      : null,
  }));

  if (!data?.data?.length) {
    throw new Response("Not found", { status: 404 });
  }

  return json({
    ministries: data?.data?.map((item) => ({
      label: item.title,
      value: item._id,
    })),
  });
};

export const CustomSelect = () => {
	const { error, getInputProps, validate } = useField("ministry");
  const [value, setValue] = useControlField<string[]>("ministry");
  const ministryFetcher = useFetcher<typeof loader>();
  const ministries = ministryFetcher.data?.ministries ?? [];

  useEffect(() => {
    if (ministryFetcher.state === "idle" && ministryFetcher.data == null) {
      ministryFetcher.load(`/resources/contactForm`);
    }
  }, [ministryFetcher]);

  return <Select defaultValue={} name="ministry" onChange={} options={ministries} />;
};
