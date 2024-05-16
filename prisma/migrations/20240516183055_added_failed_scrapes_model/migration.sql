-- CreateTable
CREATE TABLE "failedScrapes" (
    "scrape_id" TEXT NOT NULL,
    "id" TEXT[],
    "sharedId" TEXT[],
    "page_link" TEXT[],
    "name" TEXT[],
    "total_reviews" INTEGER[],

    CONSTRAINT "failedScrapes_pkey" PRIMARY KEY ("scrape_id")
);
