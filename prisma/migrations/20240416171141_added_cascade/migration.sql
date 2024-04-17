-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_retailer_id_fkey";

-- DropForeignKey
ALTER TABLE "SephoraProduct" DROP CONSTRAINT "SephoraProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "UltaProduct" DROP CONSTRAINT "UltaProduct_product_id_fkey";

-- AddForeignKey
ALTER TABLE "UltaProduct" ADD CONSTRAINT "UltaProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SephoraProduct" ADD CONSTRAINT "SephoraProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "Retailer"("retailer_id") ON DELETE CASCADE ON UPDATE CASCADE;
