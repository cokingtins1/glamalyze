/*
  Warnings:

  - Made the column `brand_id` on table `AllProducts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AllProducts" ALTER COLUMN "brand_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "AllProducts" ADD CONSTRAINT "AllProducts_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "AllBrands"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;
