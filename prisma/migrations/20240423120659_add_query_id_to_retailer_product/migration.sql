/*
  Warnings:

  - Added the required column `query_id` to the `SephoraProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `query_id` to the `UltaProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SephoraProduct" ADD COLUMN     "query_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UltaProduct" ADD COLUMN     "query_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UltaProduct" ADD CONSTRAINT "UltaProduct_query_id_fkey" FOREIGN KEY ("query_id") REFERENCES "Query"("query_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SephoraProduct" ADD CONSTRAINT "SephoraProduct_query_id_fkey" FOREIGN KEY ("query_id") REFERENCES "Query"("query_id") ON DELETE RESTRICT ON UPDATE CASCADE;
