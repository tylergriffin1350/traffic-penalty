/*
  Warnings:

  - You are about to drop the column `penalityTypeId` on the `Penality` table. All the data in the column will be lost.
  - You are about to drop the `PenalityType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `penaltyTypeId` to the `Penality` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Penality" DROP CONSTRAINT "Penality_penalityTypeId_fkey";

-- AlterTable
ALTER TABLE "Penality" DROP COLUMN "penalityTypeId",
ADD COLUMN     "penaltyTypeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "PenalityType";

-- CreateTable
CREATE TABLE "PenaltyType" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "code" TEXT,
    "point" INTEGER,
    "fee" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenaltyType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Penality" ADD CONSTRAINT "Penality_penaltyTypeId_fkey" FOREIGN KEY ("penaltyTypeId") REFERENCES "PenaltyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
