-- CreateTable
CREATE TABLE "_Page_relations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Page" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Page" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_Page_relations_AB_unique" ON "_Page_relations"("A", "B");

-- CreateIndex
CREATE INDEX "_Page_relations_B_index" ON "_Page_relations"("B");
