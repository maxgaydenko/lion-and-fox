import "dotenv/config";
import { config } from "@keystone-6/core";
import { lists } from "./schema";
import { server } from "./server";
import { withAuth, session } from "./auth";
import { envFilesBaseUrl, envFilesStoragePath, envImagesBaseUrl, envImagesStoragePath } from "./env";
import { RoleAdmin } from "./roles";

export default withAuth(
 config({
  server: server,
  storage: {
   localFiles: {
    type: "file",
    kind: "local",
    generateUrl: path => `${envFilesBaseUrl}${path}`,
    transformName: path => `${new Date().getTime()}/${path}`,
    serverRoute: null,
    // serverRoute: {
    //  path: "/images",
    // },
    storagePath: envFilesStoragePath,
   },
   localImgs: {
    type: "image",
    kind: "local",
    generateUrl: path => `${envImagesBaseUrl}${path}`,
    serverRoute: null,
    // serverRoute: {
    //  path: "/images",
    // },
    storagePath: envImagesStoragePath,
   },
  },
  // files: {
  //  upload: "local",
  //  transformFilename: (original: string): string => {
  //   return `${new Date().getTime()}/${original}`;
  //  },
  //  local: {
  //   storagePath: envFilesStoragePath,
  //   baseUrl: envFilesBaseUrl,
  //  },
  // },
  // images: {
  //  upload: "local",
  //  local: {
  //   storagePath: envImagesStoragePath,
  //   baseUrl: envImagesBaseUrl,
  //  },
  // },
  db: {
   provider: "sqlite",
   url: "file:../db/app.db",
   useMigrations: true,
  },
  ui: {
   isAccessAllowed: async context => {
    const ok = Boolean(context.session && context.session.data && context.session.data.role && context.session.data.role === RoleAdmin);
    if (!ok && context.endSession) await context.endSession();
    return ok;
   },
   // isAccessAllowed: context => !!context.session?.data,
  },
  lists,
  session,
 })
);
