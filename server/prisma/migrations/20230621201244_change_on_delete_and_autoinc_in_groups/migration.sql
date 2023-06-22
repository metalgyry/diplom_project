-- DropForeignKey
ALTER TABLE "Group chat messages" DROP CONSTRAINT "Group chat messages_id_group_fkey";

-- DropForeignKey
ALTER TABLE "Group projects" DROP CONSTRAINT "Group projects_id_creator_fkey";

-- AlterTable
CREATE SEQUENCE groups_id_group_seq;
ALTER TABLE "Groups" ALTER COLUMN "id_group" SET DEFAULT nextval('groups_id_group_seq');
ALTER SEQUENCE groups_id_group_seq OWNED BY "Groups"."id_group";

-- AddForeignKey
ALTER TABLE "Group chat messages" ADD CONSTRAINT "Group chat messages_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "Groups"("id_group") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group projects" ADD CONSTRAINT "Group projects_id_creator_fkey" FOREIGN KEY ("id_creator") REFERENCES "Students"("id_student") ON DELETE RESTRICT ON UPDATE CASCADE;
