-- CreateTable
CREATE TABLE "Showcase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pos" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL DEFAULT '',
    "img_filesize" INTEGER,
    "img_extension" TEXT,
    "img_width" INTEGER,
    "img_height" INTEGER,
    "img_mode" TEXT,
    "img_id" TEXT,
    "gallery" TEXT
);
