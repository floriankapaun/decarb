/*
  Warnings:

  - The values [HORIZONTAL,VERTICAL] on the enum `BadgeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BadgeType_new" AS ENUM ('DEFAULT');
ALTER TABLE "badges" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "badges" ALTER COLUMN "type" TYPE "BadgeType_new" USING ("type"::text::"BadgeType_new");
ALTER TYPE "BadgeType" RENAME TO "BadgeType_old";
ALTER TYPE "BadgeType_new" RENAME TO "BadgeType";
DROP TYPE "BadgeType_old";
ALTER TABLE "badges" ALTER COLUMN "type" SET DEFAULT 'DEFAULT';
COMMIT;

-- AlterTable
ALTER TABLE "badges" ALTER COLUMN "type" SET DEFAULT E'DEFAULT';
