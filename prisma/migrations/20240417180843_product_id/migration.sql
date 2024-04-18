-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "product_name" DROP NOT NULL,
ALTER COLUMN "product_image_url" DROP NOT NULL,
ALTER COLUMN "brand_id" DROP NOT NULL,
ALTER COLUMN "brand_name" DROP NOT NULL;
