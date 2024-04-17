/*
  Warnings:

  - You are about to drop the column `review_author` on the `Review` table. All the data in the column will be lost.
  - Added the required column `reviewer_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "review_author",
ADD COLUMN     "reviewer_id" TEXT NOT NULL,
ADD COLUMN     "reviewer_name" TEXT;

-- CreateTable
CREATE TABLE "Reviewer" (
    "reviewer_id" TEXT NOT NULL,

    CONSTRAINT "Reviewer_pkey" PRIMARY KEY ("reviewer_id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "Reviewer"("reviewer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
