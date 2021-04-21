/*
  Warnings:

  - The values [TREE,OFFSET] on the enum `OffsetType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `number_of_trees` on the `offsets` table. All the data in the column will be lost.
  - You are about to drop the column `company_name` on the `offsets` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OffsetType_new" AS ENUM ('CARBON_OFFSET');
ALTER TABLE "offsets" ALTER COLUMN "offset_type" TYPE "OffsetType_new" USING ("offset_type"::text::"OffsetType_new");
ALTER TABLE "subscriptions" ALTER COLUMN "offset_type" TYPE "OffsetType_new" USING ("offset_type"::text::"OffsetType_new");
ALTER TYPE "OffsetType" RENAME TO "OffsetType_old";
ALTER TYPE "OffsetType_new" RENAME TO "OffsetType";
DROP TYPE "OffsetType_old";
COMMIT;

-- AlterTable
ALTER TABLE "offsets" DROP COLUMN "number_of_trees",
DROP COLUMN "company_name",
ALTER COLUMN "offset_type" SET DEFAULT E'CARBON_OFFSET';
