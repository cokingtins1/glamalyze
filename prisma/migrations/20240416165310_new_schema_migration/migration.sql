/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userPreferenceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPreference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_favoritedById_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userPreferenceId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_B_fkey";

-- DropIndex
DROP INDEX "User_age_name_key";

-- DropIndex
DROP INDEX "User_email_idx";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_userPreferenceId_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "age",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "isAdmin",
DROP COLUMN "name",
DROP COLUMN "userPreferenceId",
ADD COLUMN     "user_email" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "UserPreference";

-- DropTable
DROP TABLE "_CategoryToPost";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Retailer" (
    "retailer_id" TEXT NOT NULL,

    CONSTRAINT "Retailer_pkey" PRIMARY KEY ("retailer_id")
);

-- CreateTable
CREATE TABLE "Query" (
    "query_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("query_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "product_image_url" TEXT NOT NULL,
    "retailer_id" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "UltaProduct" (
    "product_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "reviews" INTEGER NOT NULL,
    "avg_rating" DOUBLE PRECISION NOT NULL,
    "percent_recommended" INTEGER NOT NULL,

    CONSTRAINT "UltaProduct_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "SephoraProduct" (
    "product_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "reviews" INTEGER NOT NULL,
    "avg_rating" DOUBLE PRECISION NOT NULL,
    "percent_recommended" INTEGER NOT NULL,

    CONSTRAINT "SephoraProduct_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "review_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "retailer_id" TEXT NOT NULL,
    "retailerRetailer_id" TEXT NOT NULL,
    "review_body" TEXT NOT NULL,
    "review_rating" INTEGER NOT NULL,
    "review_date" TIMESTAMP(3) NOT NULL,
    "review_author" TEXT NOT NULL,
    "verified_buyer" BOOLEAN NOT NULL,
    "up_votes" INTEGER NOT NULL,
    "down_votes" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- AddForeignKey
ALTER TABLE "UltaProduct" ADD CONSTRAINT "UltaProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SephoraProduct" ADD CONSTRAINT "SephoraProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_retailer_id_fkey" FOREIGN KEY ("retailer_id") REFERENCES "Retailer"("retailer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
