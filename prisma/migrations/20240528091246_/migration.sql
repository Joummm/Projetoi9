/*
  Warnings:

  - You are about to drop the column `userId` on the `Administrador` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Instalacao` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Revendedor` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Administrador" DROP CONSTRAINT "Administrador_userId_fkey";

-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_userId_fkey";

-- DropForeignKey
ALTER TABLE "Instalacao" DROP CONSTRAINT "Instalacao_userId_fkey";

-- DropForeignKey
ALTER TABLE "Revendedor" DROP CONSTRAINT "Revendedor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "Administrador_userId_key";

-- DropIndex
DROP INDEX "Cliente_userId_key";

-- DropIndex
DROP INDEX "Instalacao_userId_key";

-- DropIndex
DROP INDEX "Revendedor_userId_key";

-- AlterTable
ALTER TABLE "Administrador" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Instalacao" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Revendedor" DROP COLUMN "userId";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "UserRole";
