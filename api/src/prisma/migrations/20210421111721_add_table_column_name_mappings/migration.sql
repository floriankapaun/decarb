/*
  Warnings:

  - You are about to drop the column `domainId` on the `badges` table. All the data in the column will be lost.
  - You are about to drop the column `domainId` on the `domain_hosting_emissions` table. All the data in the column will be lost.
  - You are about to drop the column `greenHosting` on the `domain_hosting_emissions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `domain_hosting_emissions` table. All the data in the column will be lost.
  - The primary key for the `domain_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `domainId` on the `domain_users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `domain_users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `domain_users` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `domain_users` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `domains` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `domains` table. All the data in the column will be lost.
  - You are about to drop the column `verifiedAt` on the `domains` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `domains` table. All the data in the column will be lost.
  - You are about to drop the column `domainId` on the `offsets` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `offsets` table. All the data in the column will be lost.
  - You are about to drop the column `offsetType` on the `offsets` table. All the data in the column will be lost.
  - You are about to drop the column `emissionAmount` on the `offsets` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `offsets` table. All the data in the column will be lost.
  - You are about to drop the column `pageId` on the `page_view_emissions` table. All the data in the column will be lost.
  - You are about to drop the column `emissionAmount` on the `page_view_emissions` table. All the data in the column will be lost.
  - You are about to drop the column `fileSize` on the `page_view_emissions` table. All the data in the column will be lost.
  - You are about to drop the column `internalRequests` on the `page_view_emissions` table. All the data in the column will be lost.
  - You are about to drop the column `externalRequests` on the `page_view_emissions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `page_view_emissions` table. All the data in the column will be lost.
  - You are about to drop the column `pageId` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `pageViewEmissionId` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `page_views` table. All the data in the column will be lost.
  - You are about to drop the column `domainId` on the `pages` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `pages` table. All the data in the column will be lost.
  - You are about to drop the column `domainId` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `paymentInterval` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionId` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `validTo` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `confirmationCode` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `confirmedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[domain_id]` on the table `badges` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company_name]` on the table `domains` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `domain_id` to the `badges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain_id` to the `domain_hosting_emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `renewable_energy` to the `domain_hosting_emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain_id` to the `domain_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `domain_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain_id` to the `offsets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscription_id` to the `offsets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offset_type` to the `offsets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emission_amount` to the `offsets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `page_id` to the `page_view_emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emission_amount` to the `page_view_emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_size` to the `page_view_emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `internal_requests` to the `page_view_emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `external_requests` to the `page_view_emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `page_id` to the `page_views` table without a default value. This is not possible if the table is not empty.
  - Added the required column `page_view_emission_id` to the `page_views` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain_id` to the `pages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripe_customer_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripe_price_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripe_subscription_id` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valid_to` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verification_code` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "badges" DROP CONSTRAINT "badges_domainId_fkey";

-- DropForeignKey
ALTER TABLE "domain_hosting_emissions" DROP CONSTRAINT "domain_hosting_emissions_domainId_fkey";

-- DropForeignKey
ALTER TABLE "domain_users" DROP CONSTRAINT "domain_users_domainId_fkey";

-- DropForeignKey
ALTER TABLE "domain_users" DROP CONSTRAINT "domain_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "offsets" DROP CONSTRAINT "offsets_domainId_fkey";

-- DropForeignKey
ALTER TABLE "offsets" DROP CONSTRAINT "offsets_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "page_view_emissions" DROP CONSTRAINT "page_view_emissions_pageId_fkey";

-- DropForeignKey
ALTER TABLE "page_views" DROP CONSTRAINT "page_views_pageId_fkey";

-- DropForeignKey
ALTER TABLE "page_views" DROP CONSTRAINT "page_views_pageViewEmissionId_fkey";

-- DropForeignKey
ALTER TABLE "pages" DROP CONSTRAINT "pages_domainId_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_domainId_fkey";

-- DropIndex
DROP INDEX "domains.companyName_unique";

-- DropIndex
DROP INDEX "badges_domainId_unique";

-- AlterTable
ALTER TABLE "badges" DROP COLUMN "domainId",
ADD COLUMN     "domain_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "domain_hosting_emissions" DROP COLUMN "domainId",
DROP COLUMN "greenHosting",
DROP COLUMN "createdAt",
ADD COLUMN     "domain_id" UUID NOT NULL,
ADD COLUMN     "renewable_energy" BOOLEAN NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "domain_users" DROP CONSTRAINT "domain_users_pkey",
DROP COLUMN "domainId",
DROP COLUMN "userId",
DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
ADD COLUMN     "domain_id" UUID NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD PRIMARY KEY ("domain_id", "user_id");

-- AlterTable
ALTER TABLE "domains" DROP COLUMN "companyName",
DROP COLUMN "createdAt",
DROP COLUMN "verifiedAt",
DROP COLUMN "deletedAt",
ADD COLUMN     "company_name" VARCHAR(100),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "verified_at" TIMESTAMP(3),
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "offsets" DROP COLUMN "domainId",
DROP COLUMN "subscriptionId",
DROP COLUMN "offsetType",
DROP COLUMN "emissionAmount",
DROP COLUMN "createdAt",
ADD COLUMN     "domain_id" UUID NOT NULL,
ADD COLUMN     "subscription_id" UUID NOT NULL,
ADD COLUMN     "offset_type" "OffsetType" NOT NULL,
ADD COLUMN     "emission_amount" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "page_view_emissions" DROP COLUMN "pageId",
DROP COLUMN "emissionAmount",
DROP COLUMN "fileSize",
DROP COLUMN "internalRequests",
DROP COLUMN "externalRequests",
DROP COLUMN "createdAt",
ADD COLUMN     "page_id" UUID NOT NULL,
ADD COLUMN     "emission_amount" INTEGER NOT NULL,
ADD COLUMN     "file_size" INTEGER NOT NULL,
ADD COLUMN     "internal_requests" INTEGER NOT NULL,
ADD COLUMN     "external_requests" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "page_views" DROP COLUMN "pageId",
DROP COLUMN "pageViewEmissionId",
DROP COLUMN "createdAt",
ADD COLUMN     "page_id" UUID NOT NULL,
ADD COLUMN     "page_view_emission_id" UUID NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "pages" DROP COLUMN "domainId",
DROP COLUMN "createdAt",
ADD COLUMN     "domain_id" UUID NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "domainId",
DROP COLUMN "paymentInterval",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripePriceId",
DROP COLUMN "stripeSubscriptionId",
DROP COLUMN "createdAt",
DROP COLUMN "validTo",
DROP COLUMN "deletedAt",
ADD COLUMN     "domain_id" UUID NOT NULL,
ADD COLUMN     "payment_interval" "PaymentInterval" NOT NULL DEFAULT E'MONTHLY',
ADD COLUMN     "stripe_customer_id" VARCHAR(50) NOT NULL,
ADD COLUMN     "stripe_price_id" VARCHAR(50) NOT NULL,
ADD COLUMN     "stripe_subscription_id" VARCHAR(50) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "valid_to" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "confirmationCode",
DROP COLUMN "createdAt",
DROP COLUMN "confirmedAt",
DROP COLUMN "deletedAt",
ADD COLUMN     "verification_code" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "verified_at" TIMESTAMP(3),
ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "badges_domain_id_unique" ON "badges"("domain_id");

-- CreateIndex
CREATE UNIQUE INDEX "domains.company_name_unique" ON "domains"("company_name");

-- AddForeignKey
ALTER TABLE "badges" ADD FOREIGN KEY ("domain_id") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain_hosting_emissions" ADD FOREIGN KEY ("domain_id") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain_users" ADD FOREIGN KEY ("domain_id") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain_users" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offsets" ADD FOREIGN KEY ("domain_id") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offsets" ADD FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_view_emissions" ADD FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_views" ADD FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_views" ADD FOREIGN KEY ("page_view_emission_id") REFERENCES "page_view_emissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD FOREIGN KEY ("domain_id") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD FOREIGN KEY ("domain_id") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;
