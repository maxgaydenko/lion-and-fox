import { list } from "@keystone-6/core";

import { text, password, integer, checkbox } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { Lists } from ".keystone/types";

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
  ui: {
   listView: {
    initialColumns: ["name", "email", "isAdmin"],
   },
  },
 }),
 Page: list({
  access: {
   filter: {
    query: ({ session }: { session: Session }) => {
     return Boolean(session) ? true : { isPublished: { equals: true } };
    },
   },
  },
  fields: {
   menuSection: text(),
   menuName: text({ validation: { isRequired: true } }),
   url: text({
    validation: {
     isRequired: true,
     match: { regex: RegExp(/^([a-zA-Z0-9])+(\/[a-zA-Z0-9]+)*$/), explanation: "Url must contains alpha and numbers divided by /" },
    },
    isIndexed: "unique",
   }),
   pos: integer({ validation: { isRequired: true }, defaultValue: 0 }),
   isPublished: checkbox({}),
   title: text({ validation: { isRequired: true } }),
   hasBlazon: checkbox(),
   content: document({
    formatting: {
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
      // headingLevels: [1, 2, 3],
      // alignment: {
      //   center: true,
      //   end: true,
      // },
      // blockTypes: {
      //   blockquote: true,
      //   code: true
      // },
      softBreaks: true,
    },
    links: true,
    dividers: true,
   }),
  },
  ui: {
   listView: {
    initialColumns: ["menuName", "url", "pos", "isPublished"],
    initialSort: { field: "pos", direction: "ASC" },
   },
  },
 }),
};
