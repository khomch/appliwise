/*
  Warnings:

  - You are about to drop the column `index` on the `Column` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Column_index_key";

-- AlterTable
ALTER TABLE "Column" DROP COLUMN "index";
