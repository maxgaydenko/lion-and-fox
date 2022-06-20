-- CreateTable
CREATE TABLE "_Showcase_users" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Showcase" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_Showcase_users_AB_unique" ON "_Showcase_users"("A", "B");

-- CreateIndex
CREATE INDEX "_Showcase_users_B_index" ON "_Showcase_users"("B");
