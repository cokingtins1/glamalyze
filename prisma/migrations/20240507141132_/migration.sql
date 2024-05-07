/*
  Warnings:

  - You are about to drop the column `retailer_id` on the `AllBrands` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AllBrands" DROP CONSTRAINT "AllBrands_retailer_id_fkey";

-- AlterTable
ALTER TABLE "AllBrands" DROP COLUMN "retailer_id";
