/*
  Warnings:

  - The `product_price` column on the `AllProducts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AllProducts" DROP COLUMN "product_price",
ADD COLUMN     "product_price" DOUBLE PRECISION[];
