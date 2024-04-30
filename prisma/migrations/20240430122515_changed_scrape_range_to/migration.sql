/*
  Warnings:

  - The `scrapeRange` column on the `ScrapeLog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ScrapeLog" DROP COLUMN "scrapeRange",
ADD COLUMN     "scrapeRange" TEXT[];
