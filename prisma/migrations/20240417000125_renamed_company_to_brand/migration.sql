/*
  Warnings:

  - You are about to drop the column `company_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `company_name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `company_name` on the `SephoraProduct` table. All the data in the column will be lost.
  - You are about to drop the column `company_name` on the `UltaProduct` table. All the data in the column will be lost.
  - The required column `brand_id` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `brand_name` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "company_id",
DROP COLUMN "company_name",
ADD COLUMN     "brand_id" TEXT NOT NULL,
ADD COLUMN     "brand_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SephoraProduct" DROP COLUMN "company_name",
ADD COLUMN     "brand_name" TEXT;

-- AlterTable
ALTER TABLE "UltaProduct" DROP COLUMN "company_name",
ADD COLUMN     "brand_name" TEXT;
