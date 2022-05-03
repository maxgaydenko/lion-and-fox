import React from "react";
import { FieldProps } from "@keystone-6/core/types";
import { Button } from "@keystone-ui/button";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
import { MinusCircleIcon, DeleteIcon, CrosshairIcon, XIcon } from "@keystone-ui/icons";
import { controller } from "@keystone-6/core/fields/types/json/views";
import { useState } from "react";
import axios from "axios";
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { envImagesGalleryFormFile, envImagesGalleryFormPath, envImagesGalleryFormUrl } from "../../env";

const SortableItem = (props: { img: string; idx: number; onDeleteClick: (idx: number) => void }) => {
 const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.img });

 const style = {
  transform: CSS.Transform.toString(transform),
  transition,
 };

 return (
  <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
   <div style={{ position: "relative", border: '1px #ddd dashed', margin: '4px', backgroundImage:`url('${props.img}')`, backgroundPosition:'center center', backgroundSize:'cover', width:'200px', height:'160px', overflow:'hidden' }}>
    {/* <img src={props.img} style={{ maxHeight: "160px", width: "auto" }} /> */}
    <div style={{ position: "absolute", zIndex: 100, right: 0, top: 0 }}>
     <Button size="small" onPointerUp={() => props.onDeleteClick(props.idx)}>
      <MinusCircleIcon size="small" color="red" />
     </Button>
    </div>
   </div>
  </div>
 );
};

export const Field = ({ field, value, onChange }: FieldProps<typeof controller>) => {
 console.log('Field.field', field);
 console.log('Field.value', value);

 const [err, setErr] = useState<string | null>(null);
 const images: string[] = value ? JSON.parse(value) : [];
 const sensors = useSensors(
  useSensor(PointerSensor)
 );

 const onShowError = (error: string) => {
  setErr(error);
 };

 const onClearError = () => {
  setErr(null);
 };

 const onAddImage = (imgUrl: string) => {
  if (onChange) {
   const imagesCopy = [...images, imgUrl];
   onChange(JSON.stringify(imagesCopy));
  }
 };

 const onDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (onChange && over && active.id !== over.id) {
   const oldIndex = images.indexOf(active.id);
   const newIndex = images.indexOf(over.id);
   const imagesCopy = arrayMove(images, oldIndex, newIndex);
   onChange(JSON.stringify(imagesCopy));
  }
 };

 const onDeleteImage = (index: number) => {
  if (onChange) {
   const imagesCopy = [...images];
   imagesCopy.splice(index, 1);
   onChange(JSON.stringify(imagesCopy));
  }
 };

 return (
  <FieldContainer>
   <FieldLabel>{field.label}</FieldLabel>

   <DndContext sensors={sensors} onDragEnd={onDragEnd}>
    <SortableContext items={images} strategy={rectSortingStrategy}>
     <div style={{ display: "flex", flexWrap: "wrap", padding:'0 0 16px' }}>
      {images.map((img, idx) => (
       <SortableItem key={img} img={img} idx={idx} onDeleteClick={onDeleteImage} />
      ))}
     </div>
    </SortableContext>
   </DndContext>

   <div style={{ position: "relative" }}>
    {err ? (
     <div style={{ background: "#d00", borderRadius: '4px', padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ color: "#fff", paddingRight:'64px' }}>{err}</div>
      <XIcon size="small" cursor="pointer" color="white" onClick={onClearError} />
     </div>
    ) : (
     <input
      type="file"
      accept=".jpg, .jpeg, .png, .svg"
      onChange={e => {
       const files = e.target.files;
       if (files !== null && files.length > 0) {
        const formData = new FormData();
        formData.append(envImagesGalleryFormFile, files[0], files[0].name);
        formData.append(envImagesGalleryFormPath, window.location.pathname);
        axios
         .post(envImagesGalleryFormUrl, formData)
         .then(ok => (ok.data.imgUrl ? onAddImage(ok.data.imgUrl) : onShowError("Unable to upload file")))
         .catch(err =>
          onShowError(
           err.response && err.response.data && err.response.data.message ? err.response.data.message : "Error while uploading file"
          )
         );
       }
      }}
     />
    )}
   </div>
  </FieldContainer>
 );
};
