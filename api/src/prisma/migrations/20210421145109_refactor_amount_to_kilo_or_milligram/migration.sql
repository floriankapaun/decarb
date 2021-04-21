/*
  Warnings:

  - You are about to drop the column `offset_amount` on the `offsets` table. All the data in the column will be lost.
  - You are about to drop the column `emission_amount` on the `page_view_emissions` table. All the data in the column will be lost.
  - Added the required column `offset_kilograms` to the `offsets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emission_milligrams` to the `page_view_emissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offsets" DROP COLUMN "offset_amount",
ADD COLUMN     "offset_kilograms" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "page_view_emissions" DROP COLUMN "emission_amount",
ADD COLUMN     "emission_milligrams" INTEGER NOT NULL;
