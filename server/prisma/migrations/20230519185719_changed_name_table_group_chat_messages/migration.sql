/*
  Warnings:

  - You are about to drop the `Group chat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Group chat" DROP CONSTRAINT "Group chat_id_creator_fkey";

-- DropForeignKey
ALTER TABLE "Group chat" DROP CONSTRAINT "Group chat_id_group_fkey";

-- DropTable
DROP TABLE "Group chat";

-- CreateTable
CREATE TABLE "Group chat messages" (
    "id_message" SERIAL NOT NULL,
    "id_group" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "id_creator" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group chat messages_pkey" PRIMARY KEY ("id_message")
);

-- AddForeignKey
ALTER TABLE "Group chat messages" ADD CONSTRAINT "Group chat messages_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "Groups"("id_group") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group chat messages" ADD CONSTRAINT "Group chat messages_id_creator_fkey" FOREIGN KEY ("id_creator") REFERENCES "Students"("id_student") ON DELETE RESTRICT ON UPDATE CASCADE;
