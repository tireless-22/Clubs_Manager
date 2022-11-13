/*
  Warnings:

  - The primary key for the `UserClub` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "UserClub" DROP CONSTRAINT "UserClub_clubId_fkey";

-- DropForeignKey
ALTER TABLE "UserClub" DROP CONSTRAINT "UserClub_userId_fkey";

-- AlterTable
ALTER TABLE "UserClub" DROP CONSTRAINT "UserClub_pkey",
ALTER COLUMN "clubId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserClub_pkey" PRIMARY KEY ("clubId", "userId");

-- AddForeignKey
ALTER TABLE "UserClub" ADD CONSTRAINT "UserClub_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClub" ADD CONSTRAINT "UserClub_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("mailId") ON DELETE RESTRICT ON UPDATE CASCADE;
