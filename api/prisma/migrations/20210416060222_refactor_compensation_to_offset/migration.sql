/*
  Warnings:

  - You are about to drop the `Compensation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[companyName]` on the table `Domain` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "OffsetType" AS ENUM ('TREE', 'OFFSET');

-- DropForeignKey
ALTER TABLE "Compensation" DROP CONSTRAINT "Compensation_domainId_fkey";

-- DropForeignKey
ALTER TABLE "Compensation" DROP CONSTRAINT "Compensation_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "DomainUsers" DROP CONSTRAINT "DomainUsers_userId_fkey";

-- AlterTable
ALTER TABLE "Domain" ADD COLUMN     "companyName" VARCHAR(100);

-- DropTable
DROP TABLE "Compensation";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "CompensationType";

-- CreateTable
CREATE TABLE "User" (
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
CREATE TABLE "Offset" (
    "id" UUID NOT NULL,
    "domainId" UUID NOT NULL,
    "subscriptionId" UUID NOT NULL,
    "offsetType" "OffsetType" NOT NULL,
    "emissionAmount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Domain.companyName_unique" ON "Domain"("companyName");

-- AddForeignKey
ALTER TABLE "Offset" ADD FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offset" ADD FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainUsers" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
