/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `Penality` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vehicleId]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Made the column `vehicleId` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `penalityTypeId` on table `Penality` required. This step will fail if there are existing NULL values in that column.
  - Made the column `driverId` on table `Penality` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Penality" DROP CONSTRAINT "Penality_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Penality" DROP CONSTRAINT "Penality_penalityTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Penality" DROP CONSTRAINT "Penality_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "vehicleId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Penality" DROP COLUMN "vehicleId",
ALTER COLUMN "penalityTypeId" SET NOT NULL,
ALTER COLUMN "driverId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Driver_vehicleId_key" ON "Driver"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_userId_key" ON "Driver"("userId");

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penality" ADD CONSTRAINT "Penality_penalityTypeId_fkey" FOREIGN KEY ("penalityTypeId") REFERENCES "PenalityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penality" ADD CONSTRAINT "Penality_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
