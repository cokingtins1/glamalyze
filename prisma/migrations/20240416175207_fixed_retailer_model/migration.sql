/*
  Warnings:

  - You are about to drop the column `retailerRetailer_id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `review_body` on the `Review` table. All the data in the column will be lost.
  - Added the required column `review_text` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "retailerRetailer_id",
DROP COLUMN "review_body",
ADD COLUMN     "review_text" TEXT NOT NULL;
