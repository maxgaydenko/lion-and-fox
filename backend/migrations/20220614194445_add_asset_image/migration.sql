-- CreateTable
CREATE TABLE "AssetImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "img_filesize" INTEGER,
    "img_extension" TEXT,
    "img_width" INTEGER,
    "img_height" INTEGER,
    "img_mode" TEXT,
    "img_id" TEXT
);
