export const isGalleryHtml = (url: string): boolean => {
 const idx = url.toLowerCase().lastIndexOf('.html');
 return Boolean(idx > 0 && idx + 5 === url.length);
}

export const galleryUtl2Id = (url: string): string => {
 return url.replaceAll("/", "").replaceAll(".", "");
}