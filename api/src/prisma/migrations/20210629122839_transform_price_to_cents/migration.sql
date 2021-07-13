/*
  Warnings:

  - You are about to drop the column `price` on the `offsets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "offsets" DROP COLUMN "price",
ADD COLUMN     "cents" INTEGER;
