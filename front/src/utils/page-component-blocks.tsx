import React from "react";
import { NotEditable, component, fields } from "@keystone-6/fields-document/component-blocks";

export const componentBlocks = {
 assetImg: component({
  label: "Image",
  preview: props => {
   return (
    <NotEditable>
     <div>
      {props.fields.assetImg.value?.data.img.url ? (
       <img src={props.fields.assetImg.value.data.img.url} />
      ) : (
       <div style={{ color: "red", fontSize: "125%", padding: "1em 0" }}>Select image</div>
      )}
      <div>{props.fields.url.value ? `link to: ${props.fields.url.value}` : "-"}</div>
     </div>
    </NotEditable>
   );
  },
  schema: {
   assetImg: fields.relationship({
    label: "Asset image",
    listKey: "AssetImage",
    selection: "id img {url}",
    many: false,
   }),
   url: fields.url({ label: "Url" }),
  },
 }),
 videoCode: component({
  label: "Video",
  // chromeless: true,
  preview: props => {
   return (
     <NotEditable>
      <div style={{ background: "#e1e5e9", padding: "0 .5em" }}>{props.fields.code.value}</div>
     </NotEditable>
   );
  },
  schema: {
   code: fields.text({
    label: "Paste code here",
    // kind: "block",
    // placeholder: "Paste code here...",
    // formatting: { inlineMarks: "inherit", softBreaks: "inherit" },
   }),
  },
 }),
};
