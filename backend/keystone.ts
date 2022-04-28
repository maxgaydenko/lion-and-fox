import 'dotenv/config';
import { config } from "@keystone-6/core";
import { lists } from "./schema";
import { server } from "./server";
import { withAuth, session } from "./auth";
import { envFilesBaseUrl, envFilesStoragePath, envImagesBaseUrl, envImagesStoragePath } from "./env";

export default withAuth(
 config({
  server: server,
  files: {
   upload: "local",
   local: {
    storagePath: envFilesStoragePath,
    baseUrl: envFilesBaseUrl,
   },
  },
  images: {
   upload: "local",
   local: {
    storagePath: envImagesStoragePath,
    baseUrl: envImagesBaseUrl,
   },
  },
  db: {
   provider: "sqlite",
   url: "file:../db/app.db",
   useMigrations: true,
  },
  ui: {
   isAccessAllowed: context => !!context.session?.data,
  },
  lists,
  session,
 })
);
