/*
  Warnings:

  - You are about to drop the column `page` on the `Project` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL DEFAULT '',
    "pos" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL DEFAULT '',
    "img_filesize" INTEGER,
    "img_extension" TEXT,
    "img_width" INTEGER,
    "img_height" INTEGER,
    "img_mode" TEXT,
    "img_id" TEXT,
    "hasBlazon" BOOLEAN NOT NULL DEFAULT false,
    "gallery" TEXT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]'
);
INSERT INTO "new_Project" ("content", "gallery", "hasBlazon", "id", "img_extension", "img_filesize", "img_height", "img_id", "img_mode", "img_width", "isPublished", "pos", "title", "url") SELECT "content", "gallery", "hasBlazon", "id", "img_extension", "img_filesize", "img_height", "img_id", "img_mode", "img_width", "isPublished", "pos", "title", "url" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_url_key" ON "Project"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
