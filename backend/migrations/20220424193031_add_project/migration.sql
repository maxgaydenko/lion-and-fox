-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "page" TEXT,
    CONSTRAINT "Project_page_fkey" FOREIGN KEY ("page") REFERENCES "Page" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_url_key" ON "Project"("url");

-- CreateIndex
CREATE INDEX "Project_page_idx" ON "Project"("page");
