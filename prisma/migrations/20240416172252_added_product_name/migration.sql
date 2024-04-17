/*
  Warnings:

  - Added the required column `product_name` to the `SephoraProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `UltaProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SephoraProduct" ADD COLUMN     "product_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UltaProduct" ADD COLUMN     "product_name" TEXT NOT NULL;
