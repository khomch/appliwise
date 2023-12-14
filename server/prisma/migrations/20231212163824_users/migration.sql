/*
  Warnings:

  - You are about to drop the column `itemId` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_columnId_fkey";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "itemId",
ADD COLUMN     "jobId" TEXT;

-- DropTable
DROP TABLE "Item";

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "position" TEXT,
    "company" TEXT,
    "location" TEXT,
    "salary" TEXT,
    "seniorityLevel" TEXT,
    "jobFunction" TEXT,
    "employmentType" TEXT,
    "industries" TEXT,
    "notes" TEXT,
    "columnId" TEXT,
    "description" TEXT,
    "img" TEXT,
    "isFavourite" BOOLEAN,
    "lastStatus" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_id_key" ON "Job"("id");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
