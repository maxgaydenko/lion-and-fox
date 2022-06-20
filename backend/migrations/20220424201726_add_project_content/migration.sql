-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "page" TEXT,
    "url" TEXT NOT NULL DEFAULT '',
    "pos" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL DEFAULT '',
    "hasBlazon" BOOLEAN NOT NULL DEFAULT false,
    "img_filesize" INTEGER,
    "img_extension" TEXT,
    "img_width" INTEGER,
    "img_height" INTEGER,
    "img_mode" TEXT,
    "img_id" TEXT,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    CONSTRAINT "Project_page_fkey" FOREIGN KEY ("page") REFERENCES "Page" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("hasBlazon", "id", "img_extension", "img_filesize", "img_height", "img_id", "img_mode", "img_width", "isPublished", "page", "pos", "title", "url") SELECT "hasBlazon", "id", "img_extension", "img_filesize", "img_height", "img_id", "img_mode", "img_width", "isPublished", "page", "pos", "title", "url" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_url_key" ON "Project"("url");
CREATE INDEX "Project_page_idx" ON "Project"("page");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
