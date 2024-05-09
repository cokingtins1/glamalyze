/*
  Warnings:

  - The `review_date` column on the `SephoraReview` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `review_date` column on the `UltaReview` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SephoraReview" DROP COLUMN "review_date",
ADD COLUMN     "review_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UltaReview" DROP COLUMN "review_date",
ADD COLUMN     "review_date" TIMESTAMP(3);
