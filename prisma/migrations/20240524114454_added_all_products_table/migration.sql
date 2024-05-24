-- CreateTable
CREATE TABLE "AllProduct" (
    "product_id" TEXT NOT NULL,
    "product_name" TEXT,
    "retailer_id" TEXT NOT NULL,
    "brand_id" TEXT NOT NULL,
    "brand_name" TEXT,
    "review_histogram" INTEGER[],
    "product_price_range" DOUBLE PRECISION[],
    "product_price" DOUBLE PRECISION,
    "sku_id" TEXT,
    "total_reviews" DOUBLE PRECISION,
    "page_link" TEXT,

    CONSTRAINT "AllProduct_pkey" PRIMARY KEY ("product_id")
);
