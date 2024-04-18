-- DropForeignKey
ALTER TABLE "Query" DROP CONSTRAINT "Query_product_id_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "queries" TEXT[] DEFAULT ARRAY['']::TEXT[];

-- AlterTable
ALTER TABLE "Query" ALTER COLUMN "product_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "billing_period_end" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "billing_period_start" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "queries_in_period" INTEGER DEFAULT 0;
