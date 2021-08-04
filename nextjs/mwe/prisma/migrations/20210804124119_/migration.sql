-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "public_id" TEXT NOT NULL PRIMARY KEY,
    "private_id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'NoName',
    "lunchProfileId" TEXT NOT NULL,
    FOREIGN KEY ("lunchProfileId") REFERENCES "LunchProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("lunchProfileId", "name", "private_id", "public_id") SELECT "lunchProfileId", "name", "private_id", "public_id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.private_id_unique" ON "User"("private_id");
CREATE TABLE "new_LunchProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mon" BOOLEAN NOT NULL DEFAULT true,
    "tue" BOOLEAN NOT NULL DEFAULT true,
    "wed" BOOLEAN NOT NULL DEFAULT true,
    "thu" BOOLEAN NOT NULL DEFAULT true,
    "fri" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_LunchProfile" ("fri", "id", "mon", "thu", "tue", "wed") SELECT "fri", "id", "mon", "thu", "tue", "wed" FROM "LunchProfile";
DROP TABLE "LunchProfile";
ALTER TABLE "new_LunchProfile" RENAME TO "LunchProfile";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
