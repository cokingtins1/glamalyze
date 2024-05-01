-- CreateTable
CREATE TABLE "AllBrands" (
    "brand_id" TEXT NOT NULL,
    "brand_name" TEXT,
    "brand_page_link" TEXT,
    "retailer_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "AllBrands_pkey" PRIMARY KEY ("brand_id")
);

-- AddForeignKey
ALTER TABLE "AllBrands" ADD CONSTRAINT "AllBrands_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "Retailer"("retailer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
