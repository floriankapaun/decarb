/*
  Warnings:

  - You are about to drop the column `kwh` on the `page_views` table. All the data in the column will be lost.
  - Added the required column `wh` to the `page_views` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "page_views" DROP COLUMN "kwh",
ADD COLUMN     "wh" REAL NOT NULL;
