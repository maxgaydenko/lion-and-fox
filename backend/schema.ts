import fs from "fs/promises";
import { list } from "@keystone-6/core";
import { v4 as uuidv4 } from "uuid";

import { text, password, integer, checkbox, relationship, image, json, select, timestamp, virtual } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { Lists } from ".keystone/types";
import { envImagesStoragePath } from "./env";
import { RoleAdmin, RoleDemo, RoleModerator } from "./roles";
import { BaseItem } from "@keystone-6/core/types";
import { graphql } from "@graphql-ts/schema";

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
   url: text({
    validation: {
     isRequired: true,
     match: {
      regex: RegExp(/^(@{0,1})([a-zA-Z0-9])+(-[a-zA-Z0-9]+)*(\/[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)*$/),
      explanation: "Url must contains alpha and numbers divided by /",
     },
    },
    isIndexed: "unique",
   }),
   parent: relationship({ ref: "Page", many: false }),
   pos: integer({ validation: { isRequired: true }, defaultValue: 0 }),
   showInMenu: checkbox({}),
   isPublished: checkbox({
    ui: {
     listView: { fieldMode: "read" },
    },
   }),
   // menuSection: text(),
   img: image({
    label: "Thumb",
    hooks: {
     // validateInput: ({ resolvedData, addValidationError, operation, fieldKey }) => {
     // },
     // beforeOperation: ({ item, operation, fieldKey }) => {
     // },
    },
    ui: {
     itemView: { fieldMode: "edit" },
    },
   }),
   // neighbors: relationship({ref:"Page", many: true}),
   hasBlazon: checkbox(),
   showNeighborsInHeader: checkbox(),
   // projects: relationship({
   //  ref: "Project.page",
   //  many: true,
   //  // label: "Gallery",
   //  ui: {},
   // }),
   pageTitle: text(),
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
    // relationships: {
    //   popupGallery: {
    //     label: 'popup gallery',
    //     kind: "inline",
    //     listKey: "PopupGallery",
    //     selection: "title",
    //   },
    // },
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
   relations: relationship({ ref: "Page", many: true, label: "Related pages" }),
   showcases: relationship({ ref: "Showcase.pages", many: true }),
  },
  access: {
   operation: {
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
   },
   filter: {
    query: ({ session }: { session: Session }) => {
     return Boolean(session) ? true : { isPublished: { equals: true } };
    },
   },
  },
  ui: {
   labelField: "url",
   listView: {
    initialColumns: ["menuName", "url", "parent", "pos", "isPublished"],
    initialSort: { field: "pos", direction: "ASC" },
   },
  },
  hooks: {
   beforeOperation: ({ item, operation }) => {
    if (operation === "delete" && item) {
     const path = envImagesStoragePath + "/pages/" + item.id;
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
    access: {
     read: ({ session, item }: { session: Session; item: any }) => {
      if (session && session.data) {
       console.log("Access read", session, item);
       console.log("Item", item.users);
       switch (session.data.role) {
        case RoleAdmin:
         return true;
        case RoleModerator:
         return true;
        case RoleDemo:
         return false;
         // return {
         //  users: { some: { id: { equals: session.data.id } } },
         //  isPublished: { equals: true },
         // };
       }
      }
      return false;
     },
    },
   }),
   users: relationship({
    ref: "User.showcases",
    many: true,
   }),
   pages: relationship({ ref: "Page.showcases", many: true }),
  },
  access: {
   // filter: {
   //  query: ({ session }: { session: Session }) => {
   //   if (session && session.data) {
   //    switch (session.data.role) {
   //     case RoleAdmin:
   //      return true;
   //     case RoleModerator: {
   //      return {
   //       users: { some: { id: { equals: session.data.id } } },
   //      };
   //     }
   //     case RoleDemo: {
   //      console.log("Filter query session", session.data);
   //      if (session.data.expirationDate) {
   //       const expirationDate = new Date(session.data.expirationDate);
   //       const now = new Date();
   //       if (expirationDate.getTime() < now.getTime()) {
   //        throw Error("You have expired access date");
   //        // return false;
   //       }
   //      }
   //      return {
   //       users: { some: { id: { equals: session.data.id } } },
   //       isPublished: { equals: true },
   //      };
   //     }
   //    }
   //   }
   //   return false;
   //   //  return Boolean(session) ? true : { isPublished: { equals: true } };
   //  },
   // },
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
 PopupGallery: list({
  fields: {
   title: text({ validation: { isRequired: true } }),
   gallery: json({
    label: "Images",
    ui: {
     views: require.resolve("./fields/gallery/components.tsx"),
     createView: { fieldMode: "hidden" },
     listView: { fieldMode: "hidden" },
     itemView: { fieldMode: "edit" },
    },
   }),
  },
  access: {
   filter: {
    query: isUser,
   },
  },
  ui: {},
  hooks: {
   beforeOperation: ({ item, operation }) => {
    if (operation === "delete" && item) {
     const path = envImagesStoragePath + "/projects/" + item.id;
     fs.rm(path, { recursive: true, force: true });
    }
   },
  },
 }),
};
