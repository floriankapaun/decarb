-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'MANAGER');

-- CreateEnum
CREATE TYPE "CompensationType" AS ENUM ('TREE', 'OFFSET');

-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('HORIZONTAL', 'VERTICAL');

-- CreateEnum
CREATE TYPE "BadgeColorscheme" AS ENUM ('COLOR', 'COLOR_INVERTED', 'SW', 'SW_INVERTED');

-- CreateEnum
CREATE TYPE "PaymentInterval" AS ENUM ('MONTHLY', 'YEARLY');

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
CREATE TABLE "Domain" (
    "id" UUID NOT NULL,
    "url" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainUsers" (
    "domainId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'MANAGER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("domainId","userId")
);

-- CreateTable
CREATE TABLE "DomainHostingEmission" (
    "id" UUID NOT NULL,
    "domainId" UUID NOT NULL,
    "greenHosting" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" UUID NOT NULL,
    "domainId" UUID NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageViewEmission" (
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
CREATE TABLE "PageViews" (
    "pageId" UUID NOT NULL,
    "pageViewEmissionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("pageId","pageViewEmissionId")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" UUID NOT NULL,
    "domainId" UUID NOT NULL,
    "colorscheme" "BadgeColorscheme" NOT NULL DEFAULT E'COLOR',
    "type" "BadgeType" NOT NULL DEFAULT E'HORIZONTAL',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compensation" (
    "id" UUID NOT NULL,
    "domainId" UUID NOT NULL,
    "subscriptionId" UUID NOT NULL,
    "compensationType" "CompensationType" NOT NULL,
    "emissionAmount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
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
CREATE UNIQUE INDEX "Domain.url_unique" ON "Domain"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Page.url_unique" ON "Page"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_domainId_unique" ON "Badge"("domainId");

-- AddForeignKey
ALTER TABLE "DomainUsers" ADD FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainUsers" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainHostingEmission" ADD FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageViewEmission" ADD FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageViews" ADD FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageViews" ADD FOREIGN KEY ("pageViewEmissionId") REFERENCES "PageViewEmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compensation" ADD FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compensation" ADD FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
