-- DropForeignKey
ALTER TABLE "Penality" DROP CONSTRAINT "Penality_operatorId_fkey";

-- AlterTable
ALTER TABLE "Penality" ALTER COLUMN "operatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Penality" ADD CONSTRAINT "Penality_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
