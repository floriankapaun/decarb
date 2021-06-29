/*
  Warnings:

  - You are about to drop the column `recorded_until` on the `offsets` table. All the data in the column will be lost.
  - You are about to drop the column `recorded_until` on the `subscriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "offsets" DROP COLUMN "recorded_until";

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "recorded_until";
