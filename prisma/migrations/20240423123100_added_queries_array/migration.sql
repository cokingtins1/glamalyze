-- AlterTable
ALTER TABLE "SephoraProduct" ADD COLUMN     "queries" TEXT[] DEFAULT ARRAY['']::TEXT[];

-- AlterTable
ALTER TABLE "UltaProduct" ADD COLUMN     "queries" TEXT[] DEFAULT ARRAY['']::TEXT[];
