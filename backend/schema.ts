import fs from "fs/promises";
import { list } from "@keystone-6/core";
import { v4 as uuidv4 } from "uuid";

import { text, password, integer, checkbox, relationship, image, json, select, timestamp } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { Lists } from ".keystone/types";
import { envImagesStoragePath } from "./env";
import { RoleAdmin, RoleDemo, RoleModerator } from "./roles";
import { BaseItem } from "@keystone-6/core/types";

type Session = {
 data: {
  id: string;
  name: string;
  role: string;
  expirationDate?: string;
 };
};

// type UserData = {
//  id: string;
// //  name: string;
// //  role: string;
// };

const isUser = ({ session }: { session: Session }) => Boolean(session && session.data && session.data.id);

const isAdmin = ({ session }: { session: Session }) => {
 return Boolean(session && session.data && session.data.role === RoleAdmin);
};

const isIam = ({ session, item }: { session: Session; item: BaseItem }) => {
 return Boolean(session?.data.id === item.id);
};

const isAdminOrIamUser = ({ session, item }: { session: Session; item: BaseItem }) => {
 return isAdmin({ session }) || isIam({ session, item });
};

export const lists: Lists = {
 User: list({
  access: {
   item: {
    update: isAdminOrIamUser,
    // update: isAdmin,
    // delete: isAdmin,
   },
   operation: {
    create: isAdmin,
    // update: isAdmin,
    delete: isAdmin,
   },
   filter: {
    // query: ({ session }: { session: Session }) => {
    //  // return session.data.isAdmin? true: {id: {equals: null}};
    //  if (session.data.isAdmin) return true;
    //  return session && session.data && session.data.name // && session.data.isAdmin)
    //   ? { name: { equals: session?.data?.name } }
    //   : { id: { equals: null } };
    // },
    // delete: isAdmin,
    // update: isAdmin,
   },
  },
  fields: {
   name: text({
    access: { update: isAdmin },
    validation: { isRequired: true },
   }),
   email: text({
    access: { update: isAdmin },
    label: "Login",
    validation: { isRequired: true },
    isIndexed: "unique",
    isFilterable: true,
   }),
   lastAccessDate: timestamp({
    access: { update: isIam },
   }),
   expirationDate: timestamp({
    access: { update: isAdminOrIamUser },
    isFilterable: true,
   }),
   role: select({
    access: {
     update: isAdmin,
    },
    type: "string",
    options: [
     { label: "Admin", value: RoleAdmin },
     { label: "Moderator", value: RoleModerator },
     { label: "Demo", value: RoleDemo },
    ],
    defaultValue: RoleModerator,
    validation: { isRequired: true },
    ui: {
     displayMode: "segmented-control",
    },
   }),
   password: password({
    access: { update: isAdmin },
    validation: { isRequired: true },
   }),
   showcases: relationship({
    access: { update: isAdmin },
    ref: "Showcase.users",
    many: true,
   }),
  },
  hooks: {
   resolveInput: ({ resolvedData, operation, item, context }) => {
    if (operation === "create" && !resolvedData.name && !resolvedData.email) {
     const uuid = uuidv4();
     return { ...resolvedData, name: uuid, email: uuid, role: RoleDemo };
    }
    if (
     operation === "update" &&
     item &&
     item.role === RoleDemo &&
     !item.lastAccessDate &&
     context.session &&
     context.session.data &&
     context.session.data.id === item.id
    ) {
     if (!item.expirationDate) {
      const now = new Date();
      now.setDate(now.getDate() + 7);
      return { ...resolvedData, expirationDate: now.toISOString() };
     }
    }
    return resolvedData;
   },
  },
  ui: {
   listView: {
    initialColumns: ["name", "role", "lastAccessDate", "expirationDate"],
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
      // console.log("validateInput on " + operation, resolvedData);
      // const width = resolvedData[fieldKey]["width"];
      // console.log("width", width);
      // // if (operation === "create" && !width) {
      // if (!width) {
      //  addValidationError("Image is required");
      // } else if (width > 1800) {
      //  addValidationError("Image is too big");
      // //  const file = `${envImagesStoragePath}${resolvedData[fieldKey]["id"]}.${resolvedData[fieldKey]["extension"]}`;
      // //  fs.unlink(file);
      //  //  unlink(file, err => {
      //  //   console.log(`File ${file} remove error`, err);
      //  //  });
      // }
     },
     beforeOperation: ({ item, operation, fieldKey }) => {
      // console.log("beforeOperation on " + operation, item);
      // if (operation === "delete" && item && item["img_id"] && item["img_extension"]) {
      //  const file = `${envImagesStoragePath}${item["img_id"]}.${item["img_extension"]}`;
      //  fs.unlink(file);
      //  unlink(file, err => {
      //   console.log(`File ${file} remove error`, err);
      //  });
      // }
     },
    },
    ui: {
     itemView: { fieldMode: "edit" },
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
   validateInput: ({ resolvedData, addValidationError, operation, inputData, item }) => {
    console.log("validateInput.resolvedData:", resolvedData);
    console.log("validateInput.inputData:", inputData);
    console.log("validateInput.item:", item);
   },
   beforeOperation: ({ item, operation }) => {
    if (operation === "delete" && item) {
     const path = envImagesStoragePath + "/projects/" + item.id;
     fs.rm(path, { recursive: true, force: true });
    }
   },
  },
 }),
 Showcase: list({
  fields: {
   title: text({ validation: { isRequired: true } }),
   pos: integer({ validation: { isRequired: true }, defaultValue: 0 }),
   isPublished: checkbox({
    ui: {
     createView: { fieldMode: "hidden" },
    },
   }),
   img: image({
    label: "Thumb",
    hooks: {
     validateInput: ({ resolvedData, addValidationError, operation, fieldKey }) => {},
     beforeOperation: ({ item, operation, fieldKey }) => {},
    },
    ui: {
     itemView: { fieldMode: "edit" },
    },
   }),
   gallery: json({
    label: "Slides",
    ui: {
     views: require.resolve("./fields/gallery/components.tsx"),
     createView: { fieldMode: "hidden" },
     listView: { fieldMode: "hidden" },
     itemView: { fieldMode: "edit" },
    },
   }),
   users: relationship({
    ref: "User.showcases",
    many: true,
   }),
  },
  access: {
   filter: {
    query: ({ session }: { session: Session }) => {
     if (session && session.data) {
      switch (session.data.role) {
       case RoleAdmin:
        return true;
       case RoleModerator: {
        return {
          users: { some: { id: { equals: session.data.id } } },
         };
        }
       case RoleDemo: {
        console.log("Filter query session", session.data);
        if (session.data.expirationDate) {
         const expirationDate = new Date(session.data.expirationDate);
         const now = new Date();
         if (expirationDate.getTime() < now.getTime()) {
          throw Error("You have expired access date");
          // return false;
         }
        }
        return {
         users: { some: { id: { equals: session.data.id } } },
         isPublished: { equals: true },
        };
       }
      }
     }
     return false;
     //  return Boolean(session) ? true : { isPublished: { equals: true } };
    },
   },
  },
  ui: {
   labelField: "title",
   listView: {
    initialColumns: ["title", "pos", "isPublished"],
    initialSort: { field: "pos", direction: "ASC" },
   },
  },
  hooks: {
   validateInput: ({ resolvedData, addValidationError, operation, inputData, item }) => {
    console.log("validateInput.resolvedData:", resolvedData);
    console.log("validateInput.inputData:", inputData);
    console.log("validateInput.item:", item);
   },
   beforeOperation: ({ item, operation }) => {
    if (operation === "delete" && item) {
     const path = envImagesStoragePath + "/projects/" + item.id;
     fs.rm(path, { recursive: true, force: true });
    }
   },
  },
 }),
};
