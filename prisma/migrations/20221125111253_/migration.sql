/*
  Warnings:

  - A unique constraint covering the columns `[designationType]` on the table `Designation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Designation_designationType_key" ON "Designation"("designationType");
