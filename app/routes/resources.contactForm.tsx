import { useFetcher } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@vercel/remix";
import { useEffect } from "react";
import { z } from "zod";
import { loadQuery } from "~/sanity/loader.server";
import { ALL_MINISTRIES } from "~/sanity/queries";
import { MinistryType, ministryZ } from "~/types/ministry";
import Select, { SingleValue } from "react-select";
import {
  useField,
  useControlField,
  validationError,
} from "remix-validated-form";
import { validator } from "~/components/ContactForm";
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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const result = await validator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  const { email, phone, subject, message, name } = result.data;
  console.log({ email, phone, subject, message, name });
  return null;
};

export const CustomSelect = ({
  name,
  label,
  className = "",
  defaultValue,
}: {
  className?: string;
  name: string;
  label: string;
  defaultValue?: string;
}) => {
  const { error, getInputProps, validate } = useField(name);
  // const [value, setValue] =
  //   useControlField<SingleValue<{ label: string; value: string }>>(name);
  const ministryFetcher = useFetcher<typeof loader>();
  const ministries = ministryFetcher.data?.ministries ?? [];

  useEffect(() => {
    if (ministryFetcher.state === "idle" && ministryFetcher.data == null) {
      ministryFetcher.load(`/resources/contactForm`);
    }
  }, [ministryFetcher]);

	console.log({defaultValue})

  return (
    <>
      <select defaultValue={defaultValue} {...getInputProps({ id: "subject" })}>
        {ministries?.map((item) => (
          <option key={item.value} value={item.label}>
            {item.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-[#ff0000]">{error}</span>}
    </>
  );
};
