/*
  Warnings:

  - The `product_price` column on the `SephoraProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sephora_product_price` column on the `SharedProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ulta_product_price` column on the `SharedProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `product_price` column on the `UltaProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SephoraProduct" ADD COLUMN     "product_price_range" DOUBLE PRECISION[],
ALTER COLUMN "avg_rating" DROP NOT NULL,
ALTER COLUMN "product_name" DROP NOT NULL,
ALTER COLUMN "sku_id" DROP NOT NULL,
ALTER COLUMN "total_reviews" DROP NOT NULL,
ALTER COLUMN "brand_name" DROP NOT NULL,
ALTER COLUMN "page_link" DROP NOT NULL,
DROP COLUMN "product_price",
ADD COLUMN     "product_price" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "SharedProduct" ADD COLUMN     "sephora_product_price_range" DOUBLE PRECISION[],
ADD COLUMN     "ulta_product_price_range" DOUBLE PRECISION[],
ALTER COLUMN "ulta_product_name" DROP NOT NULL,
ALTER COLUMN "sephora_product_name" DROP NOT NULL,
ALTER COLUMN "brand_name" DROP NOT NULL,
ALTER COLUMN "sephora_avg_rating" DROP NOT NULL,
DROP COLUMN "sephora_product_price",
ADD COLUMN     "sephora_product_price" DOUBLE PRECISION,
ALTER COLUMN "sephora_sku_id" DROP NOT NULL,
ALTER COLUMN "sephora_total_reviews" DROP NOT NULL,
ALTER COLUMN "ulta_avg_rating" DROP NOT NULL,
DROP COLUMN "ulta_product_price",
ADD COLUMN     "ulta_product_price" DOUBLE PRECISION,
ALTER COLUMN "ulta_sku_id" DROP NOT NULL,
ALTER COLUMN "ulta_total_reviews" DROP NOT NULL,
ALTER COLUMN "sephora_page_link" DROP NOT NULL,
ALTER COLUMN "ulta_page_link" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UltaProduct" ADD COLUMN     "product_price_range" DOUBLE PRECISION[],
ALTER COLUMN "avg_rating" DROP NOT NULL,
ALTER COLUMN "product_name" DROP NOT NULL,
ALTER COLUMN "sku_id" DROP NOT NULL,
ALTER COLUMN "total_reviews" DROP NOT NULL,
ALTER COLUMN "brand_name" DROP NOT NULL,
ALTER COLUMN "page_link" DROP NOT NULL,
DROP COLUMN "product_price",
ADD COLUMN     "product_price" DOUBLE PRECISION;
