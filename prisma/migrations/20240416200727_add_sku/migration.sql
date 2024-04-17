/*
  Warnings:

  - You are about to drop the column `reviews` on the `SephoraProduct` table. All the data in the column will be lost.
  - You are about to drop the column `reviews` on the `UltaProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SephoraProduct" DROP COLUMN "reviews",
ADD COLUMN     "review_histogram" INTEGER[],
ADD COLUMN     "sku_id" INTEGER,
ADD COLUMN     "total_reviews" INTEGER,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "avg_rating" DROP NOT NULL,
ALTER COLUMN "percent_recommended" DROP NOT NULL,
ALTER COLUMN "product_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UltaProduct" DROP COLUMN "reviews",
ADD COLUMN     "review_histogram" INTEGER[],
ADD COLUMN     "sku_id" INTEGER,
ADD COLUMN     "total_reviews" INTEGER,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "avg_rating" DROP NOT NULL,
ALTER COLUMN "percent_recommended" DROP NOT NULL,
ALTER COLUMN "product_name" DROP NOT NULL;
