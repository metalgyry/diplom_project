-- AddForeignKey
ALTER TABLE "Group chat" ADD CONSTRAINT "Group chat_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "Groups"("id_group") ON DELETE RESTRICT ON UPDATE CASCADE;
