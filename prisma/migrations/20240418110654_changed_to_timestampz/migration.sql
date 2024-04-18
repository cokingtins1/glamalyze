/*
  Warnings:

  - Made the column `created_at` on table `Query` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Query" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "review_date" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);
