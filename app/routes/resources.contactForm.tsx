import { useFetcher } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@vercel/remix";
import { HTMLInputTypeAttribute, useEffect } from "react";
import { z } from "zod";
import { loadQuery } from "~/sanity/loader.server";
import { ALL_MINISTRIES } from "~/sanity/queries";
import { MinistryType, ministryZ } from "~/types/ministry";
import Select from "react-select";
import {
  useField,
  useControlField,
  setFormDefaults,
  ValidatedForm,
  useIsSubmitting,
  validationError,
} from "remix-validated-form";
import { Send } from "lucide-react";
import { cn } from "~/lib/misc";
import { contactFormValidator } from "~/components/ContactForm";
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);

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

  // console.log(formData.get);

  const result = await contactFormValidator.validate(formData);

  if (result.error) {
    return validationError(result.error);
  }

  

  const { email, phone, subject, message, name, ministries } = result.data;
  const modifiedSubject = JSON.parse(ministries || "").find(
    (item: { value: string }) => item.value === subject
  )?.label;
  console.log({ email, phone, subject, message, name, ministries, modifiedSubject });
  return redirect("/thank-you");
};

export const CustomSelect = ({
  name,
  className = "",
}: {
  className?: string;
  name: string;
  label: string;
}) => {
  const { error, getInputProps, validate } = useField(name);
  const [value, setValue] = useControlField<{ label: string; value: string }>(
    name
  );
  const ministryFetcher = useFetcher<typeof loader>();
  const ministries = ministryFetcher.data?.ministries ?? [];

  console.log({ value, ...getInputProps({ id: "subject" }) });

  useEffect(() => {
    if (ministryFetcher.state === "idle" && ministryFetcher.data == null) {
      ministryFetcher.load(`/resources/contactForm`);
    }
  }, [ministryFetcher]);

  return (
    <>
      {/* <select defaultValue={value.value} key="test" {...getInputProps({ id: "subject" })}>
        {ministries?.map((item) => (
          <option key={item.value} value={item.label}>
            {item.label}
          </option>
        ))}
      </select> */}
      <input
        type="hidden"
        name="ministries"
        value={JSON.stringify(ministries, null, 2)}
      />
      {/* {ministries?.map((item) => (
        <option key={item.value} value={item.label}>
          {item.label}
        </option>
      ))} */}
      <Select
        {...getInputProps({ id: "subject" })}
        className={className}
        defaultValue={value}
        options={ministries}
        name={name}
      />
      {error && <span className="text-sm texff0000]">{error}</span>}
    </>
  );
};
