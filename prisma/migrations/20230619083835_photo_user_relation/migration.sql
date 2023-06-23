/*
  Warnings:

  - You are about to drop the column `test` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `user_Id` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "test",
ADD COLUMN     "user_Id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
