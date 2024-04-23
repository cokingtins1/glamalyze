/*
  Warnings:

  - A unique constraint covering the columns `[sku_id]` on the table `SephoraProduct` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku_id]` on the table `UltaProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sephora_sku_id" TEXT,
ADD COLUMN     "ulta_sku_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "SephoraProduct_sku_id_key" ON "SephoraProduct"("sku_id");

-- CreateIndex
CREATE UNIQUE INDEX "UltaProduct_sku_id_key" ON "UltaProduct"("sku_id");
