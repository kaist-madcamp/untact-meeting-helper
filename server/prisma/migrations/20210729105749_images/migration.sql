/*
  Warnings:

  - You are about to drop the column `image` on the `MeetingLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MeetingLog" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
