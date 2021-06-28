/*
  Warnings:

  - You are about to drop the column `emission_milligrams` on the `page_view_emissions` table. All the data in the column will be lost.
  - You are about to drop the column `external_requests` on the `page_view_emissions` table. All the data in the column will be lost.
  - You are about to drop the column `file_size` on the `page_view_emissions` table. All the data in the column will be lost.
  - You are about to drop the column `internal_requests` on the `page_view_emissions` table. All the data in the column will be lost.
  - Added the required column `byte` to the `page_view_emissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `byte` to the `page_views` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kwh` to the `page_views` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "domains.company_name_unique";

-- AlterTable
ALTER TABLE "page_view_emissions" DROP COLUMN "emission_milligrams",
DROP COLUMN "external_requests",
DROP COLUMN "file_size",
DROP COLUMN "internal_requests",
ADD COLUMN     "byte" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "page_views" ADD COLUMN     "byte" INTEGER NOT NULL,
ADD COLUMN     "kwh" INTEGER NOT NULL,
ALTER COLUMN "window_width" DROP NOT NULL,
ALTER COLUMN "window_height" DROP NOT NULL,
ALTER COLUMN "connection_type" DROP NOT NULL;
