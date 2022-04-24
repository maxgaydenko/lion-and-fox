import { config } from "@keystone-6/core";
import { lists } from "./schema";
import { withAuth, session } from "./auth";
import express from "express";
import { envFilesBaseUrl, envFilesStoragePath, envImagesBaseUrl, envImagesStoragePath } from "./env";

// const getProductionEnv = (envVariable: string, defaultValue: string): string => {
//  if (process.env.NODE_ENV === "production") {
//   const variable = process.env[envVariable];
//   if (!variable) throw new Error(`The ${envVariable} environment variable must be set in production`);
//   return variable;
//  }
//  return defaultValue;
// };

// let dbFile = process.env.DB_FILE;
// if (!dbFile) {
//  if (process.env.NODE_ENV === "production") {
//   throw new Error("The DB_FILE environment variable must be set in production");
//  } else {
//   dbFile = "./keystone.db";
//  }
// }

const packageJson = require('./package.json');
// const filesStoragePath = getProductionEnv("FILES_STORAGE_PATH", "../storage/files/");
// const filesBaseUrl = getProductionEnv("FILES_BASE_URL", "/storage");
// const imagesStoragePath = getProductionEnv("IMAGES_STORAGE_PATH", "../storage/images/");
// const imagesBaseUrl = getProductionEnv("IMAGES_BASE_URL", "/images");

export default withAuth(
 config({
  server: {
   cors: true,
   extendExpressApp: (app, createContext) => {
    app.use(envFilesBaseUrl, express.static(envFilesStoragePath));
    app.use(envImagesBaseUrl, express.static(envImagesStoragePath));
    app.get("/api/version", async (req, res) => {
     res.json({ version: packageJson.version });
    });
    // app.get("/api/users", async (req, res) => {
    //  const context = await createContext(req, res);
    //  const users = await context.query.User.findMany();
    //  res.json(users);
    // });
   },
  },
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
