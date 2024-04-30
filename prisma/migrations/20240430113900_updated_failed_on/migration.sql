/*
  Warnings:

  - You are about to drop the column `status` on the `ScrapeLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ScrapeLog" DROP COLUMN "status",
ADD COLUMN     "failedOn" TEXT;
