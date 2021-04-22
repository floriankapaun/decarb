/*
  Warnings:

  - A unique constraint covering the columns `[refresh_token]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "refresh_token" UUID,
ADD COLUMN     "refresh_token_expiry" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "users.refresh_token_unique" ON "users"("refresh_token");
