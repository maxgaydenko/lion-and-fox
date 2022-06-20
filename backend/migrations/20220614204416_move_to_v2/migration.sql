/*
  Warnings:

  - You are about to drop the column `img_extension` on the `AssetImage` table. All the data in the column will be lost.
  - You are about to drop the column `img_filesize` on the `AssetImage` table. All the data in the column will be lost.
  - You are about to drop the column `img_height` on the `AssetImage` table. All the data in the column will be lost.
  - You are about to drop the column `img_id` on the `AssetImage` table. All the data in the column will be lost.
  - You are about to drop the column `img_mode` on the `AssetImage` table. All the data in the column will be lost.
  - You are about to drop the column `img_width` on the `AssetImage` table. All the data in the column will be lost.
  - You are about to drop the column `img_mode` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `img_mode` on the `Showcase` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AssetImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_AssetImage" ("id", "title") SELECT "id", "title" FROM "AssetImage";
DROP TABLE "AssetImage";
ALTER TABLE "new_AssetImage" RENAME TO "AssetImage";
CREATE TABLE "new_Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "menuName" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "parent" TEXT,
    "pos" INTEGER NOT NULL DEFAULT 0,
    "showInMenu" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "img_filesize" INTEGER,
    "img_extension" TEXT,
    "img_width" INTEGER,
    "img_height" INTEGER,
    "img_id" TEXT,
    "hasBlazon" BOOLEAN NOT NULL DEFAULT false,
    "showNeighborsInHeader" BOOLEAN NOT NULL DEFAULT false,
    "pageTitle" TEXT NOT NULL DEFAULT '',
    "gallery" TEXT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    CONSTRAINT "Page_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Page" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Page" ("content", "gallery", "hasBlazon", "id", "img_extension", "img_filesize", "img_height", "img_id", "img_width", "isPublished", "menuName", "pageTitle", "parent", "pos", "showInMenu", "showNeighborsInHeader", "url") SELECT "content", "gallery", "hasBlazon", "id", "img_extension", "img_filesize", "img_height", "img_id", "img_width", "isPublished", "menuName", "pageTitle", "parent", "pos", "showInMenu", "showNeighborsInHeader", "url" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
CREATE UNIQUE INDEX "Page_url_key" ON "Page"("url");
CREATE INDEX "Page_parent_idx" ON "Page"("parent");
CREATE TABLE "new_Showcase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "pos" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "img_filesize" INTEGER,
    "img_extension" TEXT,
    "img_width" INTEGER,
    "img_height" INTEGER,
    "img_id" TEXT,
    "gallery" TEXT
);
INSERT INTO "new_Showcase" ("gallery", "id", "img_extension", "img_filesize", "img_height", "img_id", "img_width", "isPublished", "pos", "title") SELECT "gallery", "id", "img_extension", "img_filesize", "img_height", "img_id", "img_width", "isPublished", "pos", "title" FROM "Showcase";
DROP TABLE "Showcase";
ALTER TABLE "new_Showcase" RENAME TO "Showcase";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
