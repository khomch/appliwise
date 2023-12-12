-- DropIndex
DROP INDEX "Column_colNum_key";

-- DropIndex
DROP INDEX "Column_status_key";

-- DropIndex
DROP INDEX "Column_title_key";

-- DropIndex
DROP INDEX "Item_url_key";

-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "isFavourite" BOOLEAN,
ADD COLUMN     "lastStatus" TEXT;
