import { defineField, defineType } from "sanity";

export default [defineType({
	name: "test",
	type: "document",
	title: "Test",
	fields: [
		defineField({
			name: "title",
			type: "string"
		})
	]
})]
