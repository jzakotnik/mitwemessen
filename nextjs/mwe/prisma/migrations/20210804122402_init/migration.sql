-- CreateTable
CREATE TABLE "User" (
    "public_id" TEXT NOT NULL PRIMARY KEY,
    "private_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lunchProfileId" TEXT NOT NULL,
    FOREIGN KEY ("lunchProfileId") REFERENCES "LunchProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LunchProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mon" BOOLEAN NOT NULL,
    "tue" BOOLEAN NOT NULL,
    "wed" BOOLEAN NOT NULL,
    "thu" BOOLEAN NOT NULL,
    "fri" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.private_id_unique" ON "User"("private_id");
