/*
  Warnings:

  - Added the required column `retailer_id` to the `Reviewer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reviewer" ADD COLUMN     "retailer_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reviewer" ADD CONSTRAINT "Reviewer_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "Retailer"("retailer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
