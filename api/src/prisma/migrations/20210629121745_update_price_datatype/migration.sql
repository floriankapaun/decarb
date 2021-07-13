/*
  Warnings:

  - The `price` column on the `offsets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "offsets" DROP COLUMN "price",
ADD COLUMN     "price" MONEY;
