import fs from "fs/promises";
import express from "express";
import formidable from "formidable";
import { BaseKeystoneTypeInfo, ServerConfig } from "@keystone-6/core/types";
import {
 envFilesBaseUrl,
 envFilesStoragePath,
 envImagesBaseUrl,
 envImagesGalleryFormFile,
 envImagesGalleryFormPath,
 envImagesGalleryFormUrl,
 envImagesStoragePath,
} from "./env";

export const server: ServerConfig<BaseKeystoneTypeInfo> = {
 cors: true,
 extendExpressApp: (app, createContext) => {
  app.use(express.json());
  app.use("/assets", express.static("./assets"));
  app.use(envFilesBaseUrl, express.static(envFilesStoragePath));
  app.use(envImagesBaseUrl, express.static(envImagesStoragePath));
  app.post('/demo', (req, res, next) => {
   console.log('req', req.body);
   const requestCode = req.body.code;
   console.log('code', requestCode);
   const ok = Boolean(requestCode === '12345')
   let code = '';
   if(ok) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZz';
    for(let i = 0; i < 16; i++) {
     const idx = Math.floor(Math.random()*alphabet.length)
     code += alphabet[idx];
    }
   }
   res.json({ok, code})
  });
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
     if (["jpg", "jpeg", "png", "gif", "svg", "html"].indexOf(fileParts[fileParts.length - 1].toLowerCase()) < 0)
      throw Error("Invalid file format");

     const filePath = `${path}/${new Date().getTime()}/`;
     await fs.mkdir(envImagesStoragePath + filePath, { recursive: true });
     await fs.rename(file.filepath, envImagesStoragePath + filePath + file.originalFilename);
     res.json({ imgUrl: envImagesBaseUrl + filePath + file.originalFilename });
    } catch (_err) {
     const err = _err as Error;
     res.status(500).json({ message: err.message });
    }
   });
  });
 },
};
