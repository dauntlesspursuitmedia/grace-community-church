import { Cog, PackageCheck } from "lucide-react";
import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Our singleton type has a list item with a custom child
      S.listItem().title("Settings").id("siteConfig").child(
        // Instead of rendering a list of documents, we render a single
        // document, specifying the `documentId` manually to ensure
        // that we're editing the single instance of the document
        S.document()
          .schemaType("siteConfig")
          .documentId("54371857-6848-47cc-b22b-98d89c6d1601")
      ).icon(Cog),
      S.listItem().title("Home Page").id("home").child(
        // Instead of rendering a list of documents, we render a single
        // document, specifying the `documentId` manually to ensure
        // that we're editing the single instance of the document
        S.document()
          .schemaType("home")
          .documentId("aa84c909-b688-46db-b49f-ecbed0e6fa21")
      ).icon(PackageCheck),
      S.divider(),
      // Regular document types
      S.documentTypeListItem("route").title("Routes"),
      S.documentTypeListItem("page").title("Pages"),
			S.divider(),
			S.documentTypeListItem("ministry").title("Ministries"),
			S.documentTypeListItem("person").title("People"),
    ]);
