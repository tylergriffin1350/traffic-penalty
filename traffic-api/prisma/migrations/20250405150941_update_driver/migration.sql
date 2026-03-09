/*
  Warnings:

  - Made the column `name` on table `Driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `licenseNumber` on table `Driver` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "licenseNumber" SET NOT NULL;
