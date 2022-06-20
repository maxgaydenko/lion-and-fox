import React from "react";
import { FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";
import { controller } from "@keystone-6/core/fields/types/json/views";
import filesize from 'filesize'

export const Field = ({ field, value, onChange }: FieldProps<typeof controller>) => {
 console.log("f", value);

 const fileName = (value as any)['fileName'];
 const fileSize = (value as any)['fileSize'];

 return (
  <FieldContainer>
   <FieldLabel>{field.label}</FieldLabel>
   {fileName && <div>
     <a href={`${fileName}`} target="_blank">{fileName}</a>
   </div>}
   {fileSize && <div style={{paddingTop:'8px', fontSize:'80%', color:'#666'}}>{filesize(fileSize)}</div>}
  </FieldContainer>
 );
};
