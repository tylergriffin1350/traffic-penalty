/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `Role` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "description" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
