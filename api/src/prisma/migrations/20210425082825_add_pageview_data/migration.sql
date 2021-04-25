/*
  Warnings:

  - Added the required column `window_width` to the `page_views` table without a default value. This is not possible if the table is not empty.
  - Added the required column `window_height` to the `page_views` table without a default value. This is not possible if the table is not empty.
  - Added the required column `connection_type` to the `page_views` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "page_views" ADD COLUMN     "window_width" INTEGER NOT NULL,
ADD COLUMN     "window_height" INTEGER NOT NULL,
ADD COLUMN     "connection_type" VARCHAR(20) NOT NULL;
