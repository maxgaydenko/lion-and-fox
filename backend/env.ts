const getProductionEnv = (envVariable: string, defaultValue: string): string => {
 if (process.env.NODE_ENV === "production") {
  const variable = process.env[envVariable];
  if (!variable) throw new Error(`The ${envVariable} environment variable must be set in production`);
  return variable;
 }
 return defaultValue;
};

export const envFilesStoragePath = getProductionEnv("FILES_STORAGE_PATH", "../storage/files/");
export const envFilesBaseUrl = getProductionEnv("FILES_BASE_URL", "/storage");
export const envImagesStoragePath = getProductionEnv("IMAGES_STORAGE_PATH", "../storage/images/");
export const envImagesBaseUrl = getProductionEnv("IMAGES_BASE_URL", "/images");
export const envImagesGalleryFormUrl = '/gallery-upload';
export const envImagesGalleryFormFile = 'file';
export const envImagesGalleryFormPath = 'path';
