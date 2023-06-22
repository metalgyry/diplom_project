/*
  Warnings:

  - You are about to drop the column `id_student` on the `SubTasks` table. All the data in the column will be lost.
  - You are about to drop the column `id_student` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the `Student project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student project" DROP CONSTRAINT "Student project_id_group_project_fkey";

-- DropForeignKey
ALTER TABLE "Student project" DROP CONSTRAINT "Student project_id_student_fkey";

-- DropForeignKey
ALTER TABLE "SubTasks" DROP CONSTRAINT "SubTasks_id_student_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_id_student_fkey";

-- AlterTable
ALTER TABLE "SubTasks" DROP COLUMN "id_student";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "id_student";

-- DropTable
DROP TABLE "Student project";

-- CreateTable
CREATE TABLE "Student projects" (
    "id_group_project" INTEGER NOT NULL,
    "id_student" INTEGER NOT NULL,

    CONSTRAINT "Student projects_pkey" PRIMARY KEY ("id_group_project","id_student")
);

-- AddForeignKey
ALTER TABLE "Student projects" ADD CONSTRAINT "Student projects_id_group_project_fkey" FOREIGN KEY ("id_group_project") REFERENCES "Group projects"("id_group_project") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student projects" ADD CONSTRAINT "Student projects_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Students"("id_student") ON DELETE CASCADE ON UPDATE CASCADE;
