-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "photo_Id" INTEGER NOT NULL,
    "user_Id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_photo_Id_key" ON "Like"("photo_Id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_user_Id_key" ON "Like"("user_Id");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_photo_Id_fkey" FOREIGN KEY ("photo_Id") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
