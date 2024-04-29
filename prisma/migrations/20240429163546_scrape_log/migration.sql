/*
  Warnings:

  - Made the column `retailer_id` on table `AllProducts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AllProducts" ALTER COLUMN "retailer_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "ScrapLog" (
    "scrape_id" TEXT NOT NULL,
    "scrape_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "target" TEXT,
    "status" JSONB,

    CONSTRAINT "ScrapLog_pkey" PRIMARY KEY ("scrape_id")
);

-- AddForeignKey
ALTER TABLE "AllProducts" ADD CONSTRAINT "AllProducts_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "Retailer"("retailer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
