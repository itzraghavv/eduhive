/*
  Warnings:

  - You are about to drop the column `starred` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "starred",
ADD COLUMN     "isStarred" BOOLEAN NOT NULL DEFAULT false;
