-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "review_headline" TEXT,
ALTER COLUMN "review_rating" DROP NOT NULL,
ALTER COLUMN "review_date" DROP NOT NULL,
ALTER COLUMN "review_author" DROP NOT NULL,
ALTER COLUMN "verified_buyer" DROP NOT NULL,
ALTER COLUMN "up_votes" DROP NOT NULL,
ALTER COLUMN "down_votes" DROP NOT NULL,
ALTER COLUMN "review_text" DROP NOT NULL;
