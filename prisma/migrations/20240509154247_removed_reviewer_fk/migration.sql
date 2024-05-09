/*
  Warnings:

  - You are about to drop the column `reviewer_id` on the `SephoraReview` table. All the data in the column will be lost.
  - You are about to drop the column `reviewer_id` on the `UltaReview` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `SephoraReviewer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `UltaReviewer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SephoraReview" DROP CONSTRAINT "SephoraReview_reviewer_id_fkey";

-- DropForeignKey
ALTER TABLE "UltaReview" DROP CONSTRAINT "UltaReview_reviewer_id_fkey";

-- AlterTable
ALTER TABLE "SephoraReview" DROP COLUMN "reviewer_id";

-- AlterTable
ALTER TABLE "SephoraReviewer" ADD COLUMN     "product_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UltaReview" DROP COLUMN "reviewer_id";

-- AlterTable
ALTER TABLE "UltaReviewer" ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UltaReviewer" ADD CONSTRAINT "UltaReviewer_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "UltaProduct"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SephoraReviewer" ADD CONSTRAINT "SephoraReviewer_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "SephoraProduct"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
