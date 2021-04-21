-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('EUR', 'USD', 'GBP', 'AUD', 'CAD');

-- AlterTable
ALTER TABLE "offsets" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT E'EUR';

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT E'EUR';
