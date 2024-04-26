/*
  Warnings:

  - The `product_image_url` column on the `AllProducts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AllProducts" DROP COLUMN "product_image_url",
ADD COLUMN     "product_image_url" TEXT[];
