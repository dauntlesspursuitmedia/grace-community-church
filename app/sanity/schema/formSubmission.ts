import { defineField, defineType } from "sanity";

export const formSubmissionType = defineType({
  name: "formSubmission",
  type: "document",
  title: "Form Submission",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "phone",
    }),
    defineField({
      name: "message",
      type: "text",
      title: "Message",
    }),
    defineField({ name: "subject", type: "string", title: "subject" }),
    defineField({
      name: "gotya",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "captchaToken",
      type: "string",
      readOnly: true,
    }),
  ],
});
