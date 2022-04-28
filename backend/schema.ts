import fs from "fs/promises";
import { list } from "@keystone-6/core";
// import { unlink } from "fs";

import { text, password, integer, checkbox, relationship, image, json, file } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { Lists } from ".keystone/types";
import { envFilesStoragePath, envImagesStoragePath } from "./env";

type Session = {
 data: {
  id: string;
  name: string;
  isAdmin: boolean;
 };
};

// const isAuth = ({ session }: { session: Session }) => Boolean(session.data)

const isAdmin = ({ session }: { session: Session }) => {
 return session?.data.isAdmin;
};

export const lists: Lists = {
 User: list({
  fields: {
   name: text({ validation: { isRequired: true } }),
   email: text({
    validation: { isRequired: true },
    isIndexed: "unique",
    isFilterable: true,
    access: {
     update: isAdmin,
    },
   }),
   isAdmin: checkbox({ access: { update: isAdmin } }),
   password: password({ validation: { isRequired: true } }),
  },
  access: {
   item: {
    update: isAdmin,
    delete: isAdmin,
   },
   operation: {
    update: isAdmin,
    delete: isAdmin,
   },
   filter: {
    query: ({ session }: { session: Session }) => {
     // return session.data.isAdmin? true: {id: {equals: null}};
     if (session.data.isAdmin) return true;
     return session && session.data && session.data.name // && session.data.isAdmin)
      ? { name: { equals: session?.data?.name } }
      : { id: { equals: null } };
    },
    delete: isAdmin,
    update: isAdmin,
   },
  },
  ui: {
   listView: {
    initialColumns: ["name", "email", "isAdmin"],
   },
  },
 }),
 Page: list({
  fields: {
   menuName: text({ validation: { isRequired: true } }),
   menuSection: text(),
   url: text({
    validation: {
     isRequired: true,
     match: { regex: RegExp(/^([a-zA-Z0-9])+(\/[a-zA-Z0-9]+)*$/), explanation: "Url must contains alpha and numbers divided by /" },
    },
    isIndexed: "unique",
   }),
   pos: integer({ validation: { isRequired: true }, defaultValue: 0 }),
   isPublished: checkbox({}),
   hasBlazon: checkbox(),
   projects: relationship({
    ref: "Project.page",
    many: true,
    // label: "Gallery",
    ui: {},
   }),
   content: document({
    formatting: {
     headingLevels: [1, 2, 3],
     inlineMarks: {
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      code: true,
      superscript: true,
      subscript: true,
      keyboard: true,
     },
     listTypes: {
      ordered: true,
      unordered: true,
     },
     softBreaks: true,
    },
    links: true,
    dividers: true,
   }),
  },
  access: {
   filter: {
    query: ({ session }: { session: Session }) => {
     return Boolean(session) ? true : { isPublished: { equals: true } };
    },
   },
  },
  ui: {
   labelField: "menuName",
   listView: {
    initialColumns: ["menuName", "menuSection", "url", "pos", "isPublished"],
    initialSort: { field: "pos", direction: "ASC" },
   },
  },
 }),
 Project: list({
  fields: {
   page: relationship({
    ref: "Page.projects",
    many: false,
   }),
   url: text({
    validation: {
     isRequired: true,
     match: { regex: RegExp(/^([a-zA-Z0-9])+$/), explanation: "Url must contains alpha and numbers only" },
    },
    isIndexed: "unique",
   }),
   pos: integer({ validation: { isRequired: true }, defaultValue: 0 }),
   isPublished: checkbox({}),
   title: text({ validation: { isRequired: true } }),
   img: image({
    label: "Thumb",
    hooks: {
     validateInput: ({ resolvedData, addValidationError, operation, fieldKey }) => {
      console.log("validateInput on " + operation, resolvedData);
      const width = resolvedData[fieldKey]["width"];
      console.log("width", width);
      if (operation === "create" && !width) {
       addValidationError("Image is required");
      } else if (width > 1800) {
       addValidationError("Image is too big");
       const file = `${envImagesStoragePath}${resolvedData[fieldKey]["id"]}.${resolvedData[fieldKey]["extension"]}`;
       fs.unlink(file);
       //  unlink(file, err => {
       //   console.log(`File ${file} remove error`, err);
       //  });
      }
     },
     beforeOperation: ({ item, operation, fieldKey }) => {
      console.log("beforeOperation on " + operation, item);
      if (operation === "delete" && item && item["img_id"] && item["img_extension"]) {
       const file = `${envImagesStoragePath}${item["img_id"]}.${item["img_extension"]}`;
       fs.unlink(file);
       //  unlink(file, err => {
       //   console.log(`File ${file} remove error`, err);
       //  });
      }
     },
    },
    ui: {
     itemView: {
      fieldMode: "read",
     },
    },
   }),
   hasBlazon: checkbox(),
   gallery: json({
    label: "Gallery",
    ui: {
     views: require.resolve("./fields/gallery/components.tsx"),
     createView: { fieldMode: "hidden" },
     listView: { fieldMode: "hidden" },
     itemView: { fieldMode: "edit" },
    },
   }),
   content: document({
    formatting: {
     headingLevels: [1, 2, 3],
     inlineMarks: {
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true,
      code: true,
      superscript: true,
      subscript: true,
      keyboard: true,
     },
     listTypes: {
      ordered: true,
      unordered: true,
     },
     softBreaks: true,
    },
    links: true,
    dividers: true,
   }),
  },
  access: {
   filter: {
    query: ({ session }: { session: Session }) => {
     return Boolean(session) ? true : { isPublished: { equals: true } };
    },
   },
  },
  ui: {
   labelField: "title",
   listView: {
    initialColumns: ["title", "url", "pos", "isPublished", "page"],
    initialSort: { field: "pos", direction: "ASC" },
   },
  },
  hooks: {
   beforeOperation: ({ item, operation }) => {
    if (operation === "delete" && item) {
     const path = envImagesStoragePath + "/projects/" + item.id;
     fs.rm(path, { recursive: true, force: true });
    }
   },
  },
 }),
 Presentation: list({
  fields: {
   title: text({ validation: { isRequired: true } }),
   pos: integer({ validation: { isRequired: true }, defaultValue: 0 }),
   isPublished: checkbox({}),
   file: file({
    hooks: {
     validateInput: ({ resolvedData, addValidationError, operation, fieldKey }) => {
      if (operation === "create" && (!resolvedData[fieldKey] || !resolvedData[fieldKey]["filename"]))
       addValidationError("File is required");
     },
    },
   }),
  },
  hooks: {
   beforeOperation: ({ item, operation }) => {
    if (operation === "delete" && item && item["file_filename"]) fs.unlink(envFilesStoragePath + item["file_filename"]);
   },
  },
  access: {
    filter: {
     query: ({ session }: { session: Session }) => {
      return Boolean(session) ? true : { isPublished: { equals: true } };
     },
    },
   },
   ui: {
    listView: {
      initialColumns: ["title", "pos", "isPublished"],
      initialSort: {field:"pos", direction: "ASC"}
    }
  }
 }),
};
