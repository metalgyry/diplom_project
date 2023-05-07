/*
  Warnings:

  - You are about to drop the column `student_name` on the `Project tasks` table. All the data in the column will be lost.
  - You are about to drop the column `id_course` on the `SubTasks` table. All the data in the column will be lost.
  - Added the required column `creator_name` to the `Project tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_creator` to the `Project tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubTasks" DROP CONSTRAINT "SubTasks_id_course_fkey";

-- AlterTable
ALTER TABLE "Project tasks" DROP COLUMN "student_name",
ADD COLUMN     "creator_name" TEXT NOT NULL,
ADD COLUMN     "id_creator" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "SubTasks" DROP COLUMN "id_course";

-- AddForeignKey
ALTER TABLE "Group projects" ADD CONSTRAINT "Group projects_id_creator_fkey" FOREIGN KEY ("id_creator") REFERENCES "Students"("id_student") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project tasks" ADD CONSTRAINT "Project tasks_id_creator_fkey" FOREIGN KEY ("id_creator") REFERENCES "Students"("id_student") ON DELETE RESTRICT ON UPDATE CASCADE;
