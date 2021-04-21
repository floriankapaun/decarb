/*
  Warnings:

  - Added the required column `offset_type` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "offset_type" "OffsetType" NOT NULL;
