/*
  Warnings:

  - Added the required column `id_creator` to the `Group projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group projects" ADD COLUMN     "id_creator" INTEGER NOT NULL;
