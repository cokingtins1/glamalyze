-- CreateTable
CREATE TABLE "AllProducts" (
    "product_id" TEXT NOT NULL,
    "product_name" TEXT,
    "product_image_url" TEXT,
    "retailer_id" TEXT[],
    "brand_id" TEXT,
    "brand_name" TEXT,
    "sku_id" TEXT,
    "avg_rating" DOUBLE PRECISION,
    "total_reviews" DOUBLE PRECISION,
    "page_link" TEXT,

    CONSTRAINT "AllProducts_pkey" PRIMARY KEY ("product_id")
);
