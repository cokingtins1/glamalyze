/*
  Warnings:

  - Added the required column `product_id` to the `Query` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retailer_id` to the `Query` table without a default value. This is not possible if the table is not empty.
  - Added the required column `query_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Query" ADD COLUMN     "filters" TEXT[],
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "retailer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "query_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "Retailer"("retailer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_query_id_fkey" FOREIGN KEY ("query_id") REFERENCES "Query"("query_id") ON DELETE RESTRICT ON UPDATE CASCADE;
