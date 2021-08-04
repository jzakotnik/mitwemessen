/*
  Warnings:

  - You are about to drop the column `userId` on the `LunchProfile` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LunchProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mon" BOOLEAN NOT NULL DEFAULT true,
    "tue" BOOLEAN NOT NULL DEFAULT true,
    "wed" BOOLEAN NOT NULL DEFAULT true,
    "thu" BOOLEAN NOT NULL DEFAULT true,
    "fri" BOOLEAN NOT NULL DEFAULT true,
    FOREIGN KEY ("id") REFERENCES "User" ("public_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LunchProfile" ("fri", "id", "mon", "thu", "tue", "wed") SELECT "fri", "id", "mon", "thu", "tue", "wed" FROM "LunchProfile";
DROP TABLE "LunchProfile";
ALTER TABLE "new_LunchProfile" RENAME TO "LunchProfile";
CREATE UNIQUE INDEX "LunchProfile.id_unique" ON "LunchProfile"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
