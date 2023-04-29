/*
  Warnings:

  - Added the required column `name_creator` to the `Group projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group projects" ADD COLUMN     "name_creator" TEXT NOT NULL;
