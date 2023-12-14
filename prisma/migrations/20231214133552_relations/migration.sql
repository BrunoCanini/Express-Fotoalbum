/*
  Warnings:

  - You are about to drop the column `category` on the `photo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[photoId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `photoId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `photo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `photoId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `photo` DROP COLUMN `category`,
    MODIFY `image` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Category_photoId_key` ON `Category`(`photoId`);

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_photoId_fkey` FOREIGN KEY (`photoId`) REFERENCES `Photo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
