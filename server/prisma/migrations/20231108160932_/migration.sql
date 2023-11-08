/*
  Warnings:

  - Added the required column `colNum` to the `Column` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Column` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "colNum" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "img" TEXT;
