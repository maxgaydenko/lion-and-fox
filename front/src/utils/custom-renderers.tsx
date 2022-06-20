import { DocumentRendererProps } from "./document-renderer";
// import { componentBlocks } from "../../../backend/page-component-blocks";

// console.log("CB", componentBlocks);

export const renderers: DocumentRendererProps["renderers"] = {
 inline: {
  relationship({ relationship, data }) {
   console.log("ll");
   if (relationship === "mention") {
    if (data === null || data.data === undefined) {
     return <span>[unknown author]</span>;
    } else {
     return <b>...</b>;
     //  return <Link href={`/author/${data.data.id}`}>{data.data.name}</Link>;
    }
   }
   return null;
  },
 },
};
