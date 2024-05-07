/*
  Warnings:

  - You are about to drop the column `sephora_brand_id` on the `SharedProduct` table. All the data in the column will be lost.
  - You are about to drop the column `sephora_brand_name` on the `SharedProduct` table. All the data in the column will be lost.
  - You are about to drop the column `ulta_brand_id` on the `SharedProduct` table. All the data in the column will be lost.
  - You are about to drop the column `ulta_brand_name` on the `SharedProduct` table. All the data in the column will be lost.
  - Added the required column `brand_id` to the `SharedProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand_name` to the `SharedProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sephora_avg_rating` to the `SharedProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sephora_sku_id` to the `SharedProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sephora_total_reviews` to the `SharedProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ulta_avg_rating` to the `SharedProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ulta_sku_id` to the `SharedProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ulta_total_reviews` to the `SharedProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SharedProduct" DROP CONSTRAINT "SharedProduct_sephora_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "SharedProduct" DROP CONSTRAINT "SharedProduct_ulta_brand_id_fkey";

-- AlterTable
ALTER TABLE "SharedProduct" DROP COLUMN "sephora_brand_id",
DROP COLUMN "sephora_brand_name",
DROP COLUMN "ulta_brand_id",
DROP COLUMN "ulta_brand_name",
ADD COLUMN     "brand_id" TEXT NOT NULL,
ADD COLUMN     "brand_name" TEXT NOT NULL,
ADD COLUMN     "sephora_avg_rating" INTEGER NOT NULL,
ADD COLUMN     "sephora_product_image_url" TEXT[],
ADD COLUMN     "sephora_product_price" INTEGER[],
ADD COLUMN     "sephora_sku_id" TEXT NOT NULL,
ADD COLUMN     "sephora_total_reviews" INTEGER NOT NULL,
ADD COLUMN     "ulta_avg_rating" INTEGER NOT NULL,
ADD COLUMN     "ulta_product_image_url" TEXT[],
ADD COLUMN     "ulta_product_price" INTEGER[],
ADD COLUMN     "ulta_sku_id" TEXT NOT NULL,
ADD COLUMN     "ulta_total_reviews" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SharedProduct" ADD CONSTRAINT "SharedProduct_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "AllBrands"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;
