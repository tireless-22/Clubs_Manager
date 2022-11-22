/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[header]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("clubId", "header");

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "clubId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_header_key" ON "Event"("header");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_eventName_fkey" FOREIGN KEY ("eventName") REFERENCES "Event"("header") ON DELETE RESTRICT ON UPDATE CASCADE;
