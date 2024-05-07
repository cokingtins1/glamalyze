/*
  Warnings:

  - You are about to drop the column `sephora_retailer_id` on the `SharedProduct` table. All the data in the column will be lost.
  - You are about to drop the column `ulta_retailer_id` on the `SharedProduct` table. All the data in the column will be lost.
  - Added the required column `sephora_page_link` to the `SharedProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ulta_page_link` to the `SharedProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SharedProduct" DROP COLUMN "sephora_retailer_id",
DROP COLUMN "ulta_retailer_id",
ADD COLUMN     "sephora_page_link" TEXT NOT NULL,
ADD COLUMN     "ulta_page_link" TEXT NOT NULL;
