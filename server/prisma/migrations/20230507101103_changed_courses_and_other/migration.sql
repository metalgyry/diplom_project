/*
  Warnings:

  - You are about to drop the `Course schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group courses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_creator` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_creator` to the `Group chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course schedule" DROP CONSTRAINT "Course schedule_id_course_fkey";

-- DropForeignKey
ALTER TABLE "Group courses" DROP CONSTRAINT "Group courses_id_course_fkey";

-- DropForeignKey
ALTER TABLE "Group courses" DROP CONSTRAINT "Group courses_id_group_fkey";

-- DropForeignKey
ALTER TABLE "Group projects" DROP CONSTRAINT "Group projects_id_creator_fkey";

-- DropForeignKey
ALTER TABLE "Project tasks" DROP CONSTRAINT "Project tasks_id_group_project_fkey";

-- DropForeignKey
ALTER TABLE "Student project" DROP CONSTRAINT "Student project_id_group_project_fkey";

-- DropForeignKey
ALTER TABLE "Student project" DROP CONSTRAINT "Student project_id_student_fkey";

-- DropForeignKey
ALTER TABLE "SubTasks" DROP CONSTRAINT "SubTasks_id_student_fkey";

-- DropForeignKey
ALTER TABLE "SubTasks" DROP CONSTRAINT "SubTasks_id_task_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_id_course_fkey";

-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_id_student_fkey";

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "id_creator" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Group chat" ADD COLUMN     "id_creator" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Course schedule";

-- DropTable
DROP TABLE "Group courses";

-- AddForeignKey
ALTER TABLE "Group chat" ADD CONSTRAINT "Group chat_id_creator_fkey" FOREIGN KEY ("id_creator") REFERENCES "Students"("id_student") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student project" ADD CONSTRAINT "Student project_id_group_project_fkey" FOREIGN KEY ("id_group_project") REFERENCES "Group projects"("id_group_project") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student project" ADD CONSTRAINT "Student project_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Students"("id_student") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group projects" ADD CONSTRAINT "Group projects_id_creator_fkey" FOREIGN KEY ("id_creator") REFERENCES "Students"("id_student") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project tasks" ADD CONSTRAINT "Project tasks_id_group_project_fkey" FOREIGN KEY ("id_group_project") REFERENCES "Group projects"("id_group_project") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Students"("id_student") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "Courses"("id_course") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTasks" ADD CONSTRAINT "SubTasks_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Tasks"("id_task") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTasks" ADD CONSTRAINT "SubTasks_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Students"("id_student") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_id_creator_fkey" FOREIGN KEY ("id_creator") REFERENCES "Students"("id_student") ON DELETE CASCADE ON UPDATE CASCADE;
