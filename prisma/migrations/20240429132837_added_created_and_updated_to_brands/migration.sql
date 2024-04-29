/*
  Warnings:

  - Added the required column `updated_at` to the `SephoraBrand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `UltaBrand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SephoraBrand" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UltaBrand" ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
