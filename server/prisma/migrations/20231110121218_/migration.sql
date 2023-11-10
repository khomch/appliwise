/*
  Warnings:

  - A unique constraint covering the columns `[index]` on the table `Column` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "index" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Column_index_key" ON "Column"("index");

-- CreateIndex
CREATE UNIQUE INDEX "Item_url_key" ON "Item"("url");
