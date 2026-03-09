/*
  Warnings:

  - You are about to drop the column `userId` on the `Driver` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[licenseNumber]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `committedAt` to the `Penality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operatorId` to the `Penality` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_userId_fkey";

-- DropIndex
DROP INDEX "Driver_userId_key";

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "userId",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "kebele" TEXT,
ADD COLUMN     "licenseNumber" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "region" TEXT;

-- AlterTable
ALTER TABLE "Penality" ADD COLUMN     "address" TEXT,
ADD COLUMN     "committedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "operatorId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Driver_licenseNumber_key" ON "Driver"("licenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_phoneNumber_key" ON "Driver"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Penality" ADD CONSTRAINT "Penality_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
