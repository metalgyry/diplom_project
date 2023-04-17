-- CreateTable
CREATE TABLE "Students" (
    "id_student" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "id_group" INTEGER NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id_student")
);

-- CreateTable
CREATE TABLE "Group chat" (
    "id_message" SERIAL NOT NULL,
    "id_group" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group chat_pkey" PRIMARY KEY ("id_message")
);

-- CreateTable
CREATE TABLE "Student project" (
    "id_group_project" INTEGER NOT NULL,
    "id_student" INTEGER NOT NULL,

    CONSTRAINT "Student project_pkey" PRIMARY KEY ("id_group_project","id_student")
);

-- CreateTable
CREATE TABLE "Group projects" (
    "id_group_project" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group projects_pkey" PRIMARY KEY ("id_group_project")
);

-- CreateTable
CREATE TABLE "Project tasks" (
    "id_task" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "status" INTEGER DEFAULT 1,
    "id_group_project" INTEGER NOT NULL,

    CONSTRAINT "Project tasks_pkey" PRIMARY KEY ("id_task")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id_task" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 2,
    "id_student" INTEGER NOT NULL,
    "id_course" INTEGER NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id_task")
);

-- CreateTable
CREATE TABLE "SubTasks" (
    "id_subtask" SERIAL NOT NULL,
    "id_task" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 2,
    "id_student" INTEGER NOT NULL,
    "id_course" INTEGER NOT NULL,

    CONSTRAINT "SubTasks_pkey" PRIMARY KEY ("id_subtask")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id_course" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id_course")
);

-- CreateTable
CREATE TABLE "Group courses" (
    "id_course" INTEGER NOT NULL,
    "id_group" INTEGER NOT NULL,

    CONSTRAINT "Group courses_pkey" PRIMARY KEY ("id_course","id_group")
);

-- CreateTable
CREATE TABLE "Groups" (
    "id_group" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id_group")
);

-- CreateTable
CREATE TABLE "Course schedule" (
    "id_course_sch" SERIAL NOT NULL,
    "id_course" INTEGER NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "hh_mm" TIME NOT NULL,
    "even_week" BOOLEAN NOT NULL DEFAULT false,
    "odd_week" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Course schedule_pkey" PRIMARY KEY ("id_course_sch")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_login_key" ON "Students"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_name_key" ON "Courses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Groups_name_key" ON "Groups"("name");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "Groups"("id_group") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student project" ADD CONSTRAINT "Student project_id_group_project_fkey" FOREIGN KEY ("id_group_project") REFERENCES "Group projects"("id_group_project") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student project" ADD CONSTRAINT "Student project_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Students"("id_student") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project tasks" ADD CONSTRAINT "Project tasks_id_group_project_fkey" FOREIGN KEY ("id_group_project") REFERENCES "Group projects"("id_group_project") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Students"("id_student") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "Courses"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTasks" ADD CONSTRAINT "SubTasks_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Tasks"("id_task") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTasks" ADD CONSTRAINT "SubTasks_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Students"("id_student") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTasks" ADD CONSTRAINT "SubTasks_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "Courses"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group courses" ADD CONSTRAINT "Group courses_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "Courses"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group courses" ADD CONSTRAINT "Group courses_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "Groups"("id_group") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course schedule" ADD CONSTRAINT "Course schedule_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "Courses"("id_course") ON DELETE RESTRICT ON UPDATE CASCADE;
