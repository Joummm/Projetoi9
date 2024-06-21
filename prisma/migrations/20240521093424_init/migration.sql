/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Administrador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Instalacao` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Revendedor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Administrador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Instalacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Revendedor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Administrador', 'Revendedor', 'Cliente', 'Instalacao');

-- AlterTable
ALTER TABLE "Administrador" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Instalacao" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Revendedor" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_userId_key" ON "Administrador"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_userId_key" ON "Cliente"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Instalacao_userId_key" ON "Instalacao"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Revendedor_userId_key" ON "Revendedor"("userId");

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revendedor" ADD CONSTRAINT "Revendedor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instalacao" ADD CONSTRAINT "Instalacao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
