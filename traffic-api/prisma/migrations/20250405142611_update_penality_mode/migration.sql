/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Vehicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vehicleId]` on the table `Penality` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vehicleId` to the `Penality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loadCapacity` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_vehicleId_fkey";

-- DropIndex
DROP INDEX "Driver_vehicleId_key";

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "vehicleId";

-- AlterTable
ALTER TABLE "Penality" ADD COLUMN     "vehicleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "name",
ADD COLUMN     "loadCapacity" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Penality_vehicleId_key" ON "Penality"("vehicleId");

-- AddForeignKey
ALTER TABLE "Penality" ADD CONSTRAINT "Penality_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
