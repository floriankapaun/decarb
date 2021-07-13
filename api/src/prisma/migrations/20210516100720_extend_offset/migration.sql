/*
  Warnings:

  - You are about to drop the column `reported_until` on the `subscriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "offsets" ADD COLUMN     "recorded_until" TIMESTAMP(3),
ALTER COLUMN "offset_kilograms" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "reported_until",
ADD COLUMN     "recorded_until" TIMESTAMP(3);
