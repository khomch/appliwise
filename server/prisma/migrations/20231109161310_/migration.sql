/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Column` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[colNum]` on the table `Column` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[status]` on the table `Column` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "orderOfIds" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Column_title_key" ON "Column"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Column_colNum_key" ON "Column"("colNum");

-- CreateIndex
CREATE UNIQUE INDEX "Column_status_key" ON "Column"("status");
