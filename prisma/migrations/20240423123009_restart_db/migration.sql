/*
  Warnings:

  - You are about to drop the column `query_id` on the `SephoraProduct` table. All the data in the column will be lost.
  - You are about to drop the column `query_id` on the `UltaProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SephoraProduct" DROP CONSTRAINT "SephoraProduct_query_id_fkey";

-- DropForeignKey
ALTER TABLE "UltaProduct" DROP CONSTRAINT "UltaProduct_query_id_fkey";

-- AlterTable
ALTER TABLE "SephoraProduct" DROP COLUMN "query_id";

-- AlterTable
ALTER TABLE "UltaProduct" DROP COLUMN "query_id";
