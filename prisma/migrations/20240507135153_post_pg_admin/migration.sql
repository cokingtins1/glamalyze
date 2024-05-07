-- CreateTable
CREATE TABLE "SharedProduct" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "similarity_score" DOUBLE PRECISION NOT NULL,
    "ulta_brand_id" TEXT NOT NULL,
    "sephora_brand_id" TEXT NOT NULL,
    "ulta_product_name" TEXT NOT NULL,
    "sephora_product_name" TEXT NOT NULL,
    "ulta_brand_name" TEXT NOT NULL,
    "sephora_brand_name" TEXT NOT NULL,
    "ulta_product_id" TEXT NOT NULL,
    "ulta_retailer_id" TEXT NOT NULL,
    "sephora_product_id" TEXT NOT NULL,
    "sephora_retailer_id" TEXT NOT NULL,

    CONSTRAINT "SharedProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SharedProduct" ADD CONSTRAINT "SharedProduct_ulta_brand_id_fkey" FOREIGN KEY ("ulta_brand_id") REFERENCES "AllBrands"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedProduct" ADD CONSTRAINT "SharedProduct_sephora_brand_id_fkey" FOREIGN KEY ("sephora_brand_id") REFERENCES "AllBrands"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedProduct" ADD CONSTRAINT "SharedProduct_ulta_product_id_fkey" FOREIGN KEY ("ulta_product_id") REFERENCES "UltaProduct"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedProduct" ADD CONSTRAINT "SharedProduct_sephora_product_id_fkey" FOREIGN KEY ("sephora_product_id") REFERENCES "SephoraProduct"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
