/*
  Warnings:

  - Added the required column `updated_at` to the `SephoraReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `UltaReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SephoraReview" ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL;

-- AlterTable
ALTER TABLE "UltaReview" ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL;
