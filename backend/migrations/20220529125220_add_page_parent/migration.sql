-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "menuName" TEXT NOT NULL DEFAULT '',
    "menuSection" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "pos" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "img_filesize" INTEGER,
    "img_extension" TEXT,
    "img_width" INTEGER,
    "img_height" INTEGER,
    "img_mode" TEXT,
    "img_id" TEXT,
    "parent" TEXT,
    "hasBlazon" BOOLEAN NOT NULL DEFAULT false,
    "pageTitle" TEXT NOT NULL DEFAULT '',
    "gallery" TEXT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    CONSTRAINT "Page_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Page" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Page" ("content", "gallery", "hasBlazon", "id", "img_extension", "img_filesize", "img_height", "img_id", "img_mode", "img_width", "isPublished", "menuName", "menuSection", "pageTitle", "pos", "url") SELECT "content", "gallery", "hasBlazon", "id", "img_extension", "img_filesize", "img_height", "img_id", "img_mode", "img_width", "isPublished", "menuName", "menuSection", "pageTitle", "pos", "url" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
CREATE UNIQUE INDEX "Page_url_key" ON "Page"("url");
CREATE INDEX "Page_parent_idx" ON "Page"("parent");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
