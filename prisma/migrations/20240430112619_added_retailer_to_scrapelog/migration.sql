/*
  Warnings:

  - You are about to drop the `ScrapLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ScrapLog";

-- CreateTable
CREATE TABLE "ScrapeLog" (
    "scrape_id" TEXT NOT NULL,
    "scrape_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retailer" TEXT,
    "target" TEXT,
    "status" JSONB,

    CONSTRAINT "ScrapeLog_pkey" PRIMARY KEY ("scrape_id")
);
