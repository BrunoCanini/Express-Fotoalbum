/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `photo` MODIFY `image` VARCHAR(255) NOT NULL DEFAULT 'https://cdn.shopify.com/s/files/1/0594/4639/5086/files/Creating_a_Photography_Logo_-_Everything_You_Need_To_Know_3d0c05bc-7b52-435d-bb7c-dfe9ba1a18d2.jpg?v=1692105642';

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
