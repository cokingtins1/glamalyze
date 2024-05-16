/*
  Warnings:

  - You are about to drop the `failedScrapes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "failedScrapes";

-- CreateTable
CREATE TABLE "FailedScrapes" (
    "scrape_id" TEXT NOT NULL,
    "id" TEXT[],
    "sharedId" TEXT[],
    "page_link" TEXT[],
    "name" TEXT[],
    "total_reviews" INTEGER[],

    CONSTRAINT "FailedScrapes_pkey" PRIMARY KEY ("scrape_id")
);
