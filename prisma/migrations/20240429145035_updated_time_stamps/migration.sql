/*
  Warnings:

  - Made the column `created_at` on table `SephoraBrand` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `SephoraBrand` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `UltaBrand` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `UltaBrand` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SephoraBrand" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "UltaBrand" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(6);
