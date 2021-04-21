/*
  Warnings:

  - You are about to drop the column `emission_amount` on the `offsets` table. All the data in the column will be lost.
  - Added the required column `from` to the `offsets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `until` to the `offsets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offset_amount` to the `offsets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'SUCCESSFULL', 'FAILED');

-- AlterTable
ALTER TABLE "offsets" DROP COLUMN "emission_amount",
ADD COLUMN     "from" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "until" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "offset_amount" INTEGER NOT NULL,
ADD COLUMN     "number_of_trees" INTEGER,
ADD COLUMN     "company_name" TEXT,
ADD COLUMN     "purchase_status" "PurchaseStatus" NOT NULL DEFAULT E'PENDING',
ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "stripe_customer_id" DROP NOT NULL,
ALTER COLUMN "stripe_price_id" DROP NOT NULL,
ALTER COLUMN "stripe_subscription_id" DROP NOT NULL;
