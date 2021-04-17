/*
  Warnings:

  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Domain` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DomainHostingEmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DomainUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Offset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PageViewEmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PageViews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_domainId_fkey";

-- DropForeignKey
ALTER TABLE "DomainHostingEmission" DROP CONSTRAINT "DomainHostingEmission_domainId_fkey";

-- DropForeignKey
ALTER TABLE "DomainUsers" DROP CONSTRAINT "DomainUsers_domainId_fkey";

-- DropForeignKey
ALTER TABLE "DomainUsers" DROP CONSTRAINT "DomainUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Offset" DROP CONSTRAINT "Offset_domainId_fkey";

-- DropForeignKey
ALTER TABLE "Offset" DROP CONSTRAINT "Offset_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_domainId_fkey";

-- DropForeignKey
ALTER TABLE "PageViewEmission" DROP CONSTRAINT "PageViewEmission_pageId_fkey";

-- DropForeignKey
ALTER TABLE "PageViews" DROP CONSTRAINT "PageViews_pageId_fkey";

-- DropForeignKey
ALTER TABLE "PageViews" DROP CONSTRAINT "PageViews_pageViewEmissionId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_domainId_fkey";

-- DropTable
DROP TABLE "Badge";

-- DropTable
DROP TABLE "Domain";

-- DropTable
DROP TABLE "DomainHostingEmission";

-- DropTable
DROP TABLE "DomainUsers";

-- DropTable
DROP TABLE "Offset";

-- DropTable
DROP TABLE "Page";

-- DropTable
DROP TABLE "PageViewEmission";

-- DropTable
DROP TABLE "PageViews";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "telephone" VARCHAR(16) NOT NULL,
    "confirmationCode" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domains" (
    "id" UUID NOT NULL,
    "url" VARCHAR(50) NOT NULL,
    "companyName" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domain_users" (
    "domainId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'MANAGER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("domainId","userId")
);

-- CreateTable
CREATE TABLE "domain_hosting_emissions" (
    "id" UUID NOT NULL,
    "domainId" UUID NOT NULL,
    "greenHosting" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" UUID NOT NULL,
    "domainId" UUID NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_view_emissions" (
    "id" UUID NOT NULL,
    "pageId" UUID NOT NULL,
    "emissionAmount" INTEGER NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "internalRequests" INTEGER NOT NULL,
    "externalRequests" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_views" (
    "pageId" UUID NOT NULL,
    "pageViewEmissionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("pageId","pageViewEmissionId")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" UUID NOT NULL,
    "domainId" UUID NOT NULL,
    "colorscheme" "BadgeColorscheme" NOT NULL DEFAULT E'COLOR',
    "type" "BadgeType" NOT NULL DEFAULT E'HORIZONTAL',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offsets" (
    "id" UUID NOT NULL,
    "domainId" UUID NOT NULL,
    "subscriptionId" UUID NOT NULL,
    "offsetType" "OffsetType" NOT NULL,
    "emissionAmount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" UUID NOT NULL,
    "domainId" UUID NOT NULL,
    "paymentInterval" "PaymentInterval" NOT NULL DEFAULT E'MONTHLY',
    "stripeCustomerId" VARCHAR(50) NOT NULL,
    "stripePriceId" VARCHAR(50) NOT NULL,
    "stripeSubscriptionId" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validTo" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "domains.url_unique" ON "domains"("url");

-- CreateIndex
CREATE UNIQUE INDEX "domains.companyName_unique" ON "domains"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "pages.url_unique" ON "pages"("url");

-- CreateIndex
CREATE UNIQUE INDEX "badges_domainId_unique" ON "badges"("domainId");

-- AddForeignKey
ALTER TABLE "domain_users" ADD FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain_users" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "domain_hosting_emissions" ADD FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_view_emissions" ADD FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_views" ADD FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_views" ADD FOREIGN KEY ("pageViewEmissionId") REFERENCES "page_view_emissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "badges" ADD FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offsets" ADD FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offsets" ADD FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;
