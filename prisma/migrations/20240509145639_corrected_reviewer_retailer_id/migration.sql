/*
  Warnings:

  - You are about to drop the column `retailerRetailer_id` on the `SephoraReviewer` table. All the data in the column will be lost.
  - You are about to drop the column `retailerRetailer_id` on the `UltaReviewer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SephoraReviewer" DROP CONSTRAINT "SephoraReviewer_retailerRetailer_id_fkey";

-- DropForeignKey
ALTER TABLE "UltaReviewer" DROP CONSTRAINT "UltaReviewer_retailerRetailer_id_fkey";

-- AlterTable
ALTER TABLE "SephoraReviewer" DROP COLUMN "retailerRetailer_id",
ADD COLUMN     "retailer_id" TEXT;

-- AlterTable
ALTER TABLE "UltaReviewer" DROP COLUMN "retailerRetailer_id",
ADD COLUMN     "retailer_id" TEXT;

-- AddForeignKey
ALTER TABLE "UltaReviewer" ADD CONSTRAINT "UltaReviewer_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "Retailer"("retailer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SephoraReviewer" ADD CONSTRAINT "SephoraReviewer_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "Retailer"("retailer_id") ON DELETE SET NULL ON UPDATE CASCADE;
