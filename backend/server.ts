import fs from "fs/promises";
import express from "express";
import formidable from "formidable";
import { BaseKeystoneTypeInfo, ServerConfig } from "@keystone-6/core/types";
import { envFilesBaseUrl, envFilesStoragePath, envImagesBaseUrl, envImagesGalleryFormFile, envImagesGalleryFormPath, envImagesGalleryFormUrl, envImagesStoragePath } from "./env";

export const server: ServerConfig<BaseKeystoneTypeInfo> = {
 cors: true,
 extendExpressApp: (app, createContext) => {
  app.use(envFilesBaseUrl, express.static(envFilesStoragePath));
  app.use(envImagesBaseUrl, express.static(envImagesStoragePath));
  app.post(envImagesGalleryFormUrl, (req, res, next) => {
   const form = formidable({ multiples: false });
   form.parse(req, async (_err, fields, files) => {
    if (_err) {
     const err = _err as Error;
     res.status(500).json({ message: err.message });
     return;
    }
    try {
     const file = <formidable.File>files[envImagesGalleryFormFile];
     if (!file || !file.originalFilename) throw Error("There are no file");
     if (!fields[envImagesGalleryFormPath]) throw Error("There are no path param");
     const path = (<string>fields[envImagesGalleryFormPath]).replace(/\./g, "");
     const fileParts = file.originalFilename.split(".");
     if (["jpg", "jpeg", "png", "gif"].indexOf(fileParts[fileParts.length - 1].toLowerCase()) < 0) throw Error("Invalid file format");

     const filePath = `${path}/${new Date().getTime()}/`; //${file.originalFilename}`
     await fs.mkdir(envImagesStoragePath + filePath, { recursive: true });
     await fs.rename(file.filepath, envImagesStoragePath + filePath + file.originalFilename);
     // const json = { files, fields };
     res.json({ imgUrl: envImagesBaseUrl + filePath + file.originalFilename });
    } catch (_err) {
     const err = _err as Error;
     res.status(500).json({ message: err.message });
    }
   });
  });
 },
};
