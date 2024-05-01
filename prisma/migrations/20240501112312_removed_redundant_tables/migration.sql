/*
  Warnings:

  - The `review_date` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SephoraBrand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UltaBrand` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand_id` to the `SephoraProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand_id` to the `UltaProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_product_id_fkey";

-- DropForeignKey
ALTER TABLE "SephoraProduct" DROP CONSTRAINT "SephoraProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "UltaProduct" DROP CONSTRAINT "UltaProduct_product_id_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "review_date",
ADD COLUMN     "review_date" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "SephoraProduct" ADD COLUMN     "brand_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UltaProduct" ADD COLUMN     "brand_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "SephoraBrand";

-- DropTable
DROP TABLE "UltaBrand";

-- AddForeignKey
ALTER TABLE "UltaProduct" ADD CONSTRAINT "UltaProduct_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "AllBrands"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UltaProduct" ADD CONSTRAINT "UltaProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "AllProducts"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SephoraProduct" ADD CONSTRAINT "SephoraProduct_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "AllBrands"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SephoraProduct" ADD CONSTRAINT "SephoraProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "AllProducts"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "AllProducts"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
