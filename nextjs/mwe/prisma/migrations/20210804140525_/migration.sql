/*
  Warnings:

  - You are about to drop the column `lunchProfileId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `LunchProfile` table without a default value. This is not possible if the table is not empty.

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
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("id") REFERENCES "User" ("public_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LunchProfile" ("fri", "id", "mon", "thu", "tue", "wed") SELECT "fri", "id", "mon", "thu", "tue", "wed" FROM "LunchProfile";
DROP TABLE "LunchProfile";
ALTER TABLE "new_LunchProfile" RENAME TO "LunchProfile";
CREATE UNIQUE INDEX "LunchProfile.id_unique" ON "LunchProfile"("id");
CREATE TABLE "new_User" (
    "public_id" TEXT NOT NULL PRIMARY KEY,
    "private_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'NoName'
);
INSERT INTO "new_User" ("name", "private_id", "public_id") SELECT "name", "private_id", "public_id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.private_id_unique" ON "User"("private_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
