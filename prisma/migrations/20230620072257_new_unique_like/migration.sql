/*
  Warnings:

  - A unique constraint covering the columns `[user_Id,photo_Id]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Like_photo_Id_key";

-- DropIndex
DROP INDEX "Like_user_Id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Like_user_Id_photo_Id_key" ON "Like"("user_Id", "photo_Id");
