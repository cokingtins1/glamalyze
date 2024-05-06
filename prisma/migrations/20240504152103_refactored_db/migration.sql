/*
  Warnings:

  - You are about to drop the column `price` on the `SephoraProduct` table. All the data in the column will be lost.
  - You are about to drop the column `queries` on the `SephoraProduct` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `UltaProduct` table. All the data in the column will be lost.
  - You are about to drop the column `queries` on the `UltaProduct` table. All the data in the column will be lost.
  - You are about to drop the `AllProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Query` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reviewer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `page_link` to the `SephoraProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `SephoraProduct` table without a default value. This is not possible if the table is not empty.
  - Made the column `avg_rating` on table `SephoraProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_name` on table `SephoraProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sku_id` on table `SephoraProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_reviews` on table `SephoraProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brand_name` on table `SephoraProduct` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `page_link` to the `UltaProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `UltaProduct` table without a default value. This is not possible if the table is not empty.
  - Made the column `avg_rating` on table `UltaProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_name` on table `UltaProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sku_id` on table `UltaProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_reviews` on table `UltaProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brand_name` on table `UltaProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AllProducts" DROP CONSTRAINT "AllProducts_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "AllProducts" DROP CONSTRAINT "AllProducts_retailer_id_fkey";

-- DropForeignKey
ALTER TABLE "Query" DROP CONSTRAINT "Query_retailer_id_fkey";

-- DropForeignKey
ALTER TABLE "Query" DROP CONSTRAINT "Query_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_query_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_retailer_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reviewer_id_fkey";

-- DropForeignKey
ALTER TABLE "Reviewer" DROP CONSTRAINT "Reviewer_retailer_id_fkey";

-- DropForeignKey
ALTER TABLE "SephoraProduct" DROP CONSTRAINT "SephoraProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "UltaProduct" DROP CONSTRAINT "UltaProduct_product_id_fkey";

-- DropIndex
DROP INDEX "SephoraProduct_sku_id_key";

-- DropIndex
DROP INDEX "UltaProduct_sku_id_key";

-- AlterTable
ALTER TABLE "SephoraProduct" DROP COLUMN "price",
DROP COLUMN "queries",
ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "page_link" TEXT NOT NULL,
ADD COLUMN     "product_image_url" TEXT[],
ADD COLUMN     "product_price" DOUBLE PRECISION[],
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL,
ALTER COLUMN "avg_rating" SET NOT NULL,
ALTER COLUMN "product_name" SET NOT NULL,
ALTER COLUMN "sku_id" SET NOT NULL,
ALTER COLUMN "total_reviews" SET NOT NULL,
ALTER COLUMN "total_reviews" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "brand_name" SET NOT NULL;

-- AlterTable
ALTER TABLE "UltaProduct" DROP COLUMN "price",
DROP COLUMN "queries",
ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "page_link" TEXT NOT NULL,
ADD COLUMN     "product_image_url" TEXT[],
ADD COLUMN     "product_price" DOUBLE PRECISION[],
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL,
ALTER COLUMN "avg_rating" SET NOT NULL,
ALTER COLUMN "product_name" SET NOT NULL,
ALTER COLUMN "sku_id" SET NOT NULL,
ALTER COLUMN "total_reviews" SET NOT NULL,
ALTER COLUMN "total_reviews" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "brand_name" SET NOT NULL;

-- DropTable
DROP TABLE "AllProducts";

-- DropTable
DROP TABLE "Query";

-- DropTable
DROP TABLE "Review";

-- DropTable
DROP TABLE "Reviewer";

-- CreateTable
CREATE TABLE "UltaReview" (
    "review_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "retailer_id" TEXT NOT NULL,
    "review_rating" INTEGER,
    "verified_buyer" BOOLEAN,
    "up_votes" INTEGER,
    "down_votes" INTEGER,
    "review_text" TEXT,
    "review_headline" TEXT,
    "reviewer_id" TEXT NOT NULL,
    "reviewer_name" TEXT,
    "review_date" TIMESTAMPTZ(6),

    CONSTRAINT "UltaReview_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "UltaReviewer" (
    "reviewer_id" TEXT NOT NULL,
    "reviewer_name" TEXT,
    "retailerRetailer_id" TEXT,

    CONSTRAINT "UltaReviewer_pkey" PRIMARY KEY ("reviewer_id")
);

-- CreateTable
CREATE TABLE "SephoraReview" (
    "review_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "retailer_id" TEXT NOT NULL,
    "review_rating" INTEGER,
    "verified_buyer" BOOLEAN,
    "up_votes" INTEGER,
    "down_votes" INTEGER,
    "review_text" TEXT,
    "review_headline" TEXT,
    "reviewer_id" TEXT NOT NULL,
    "reviewer_name" TEXT,
    "review_date" TIMESTAMPTZ(6),

    CONSTRAINT "SephoraReview_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "SephoraReviewer" (
    "reviewer_id" TEXT NOT NULL,
    "reviewer_name" TEXT,
    "retailerRetailer_id" TEXT,

    CONSTRAINT "SephoraReviewer_pkey" PRIMARY KEY ("reviewer_id")
);

-- AddForeignKey
ALTER TABLE "UltaReview" ADD CONSTRAINT "UltaReview_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "UltaProduct"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UltaReview" ADD CONSTRAINT "UltaReview_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "Retailer"("retailer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UltaReview" ADD CONSTRAINT "UltaReview_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "UltaReviewer"("reviewer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UltaReviewer" ADD CONSTRAINT "UltaReviewer_retailerRetailer_id_fkey" FOREIGN KEY ("retailerRetailer_id") REFERENCES "Retailer"("retailer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SephoraReview" ADD CONSTRAINT "SephoraReview_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "SephoraProduct"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SephoraReview" ADD CONSTRAINT "SephoraReview_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "Retailer"("retailer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SephoraReview" ADD CONSTRAINT "SephoraReview_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "SephoraReviewer"("reviewer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SephoraReviewer" ADD CONSTRAINT "SephoraReviewer_retailerRetailer_id_fkey" FOREIGN KEY ("retailerRetailer_id") REFERENCES "Retailer"("retailer_id") ON DELETE SET NULL ON UPDATE CASCADE;
