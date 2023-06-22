import { useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

let socket;

export const useGroupChat = (id_group, id_student, chatStore) => {
    console.log('groupChatMessages(id_group): ',id_group);

  if (!socket) {
    socket = io(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_SERVER_SOCKET_GROUP_CHAT_PORT}/group-chat`, {
      auth: {
        id_group: String(id_group),
      },
      path: '/chat/',
    });
  }

  const [chatChange, setChatChange] = useState(0);

  useEffect(() => {
    socket.connect();
    socket.emit("groupChatMessages:get");

    return () => {
        socket.offAny();
        socket.disconnect();
        socket = null;
    }
  }, []);

  useEffect(() => {

    socket.on("groupChatMessages:get", (groupChatListMessages) => {
      console.log("groupChatMessages:get: ", groupChatListMessages);

      setChatChange(chatChange => chatChange + 1);
      console.log(chatChange);
      chatStore.chat = groupChatListMessages;
    });

    socket.on("groupChatMessages:post", (groupChatNewMessage) => {
      console.log('groupChatNewMessage: ', groupChatNewMessage);
      
      setChatChange(chatChange => chatChange + 1);
      console.log(chatChange);
      if(id_student == groupChatNewMessage.id_creator) {
        chatStore.isLoadingChat = false;
        console.log("its me");
      }
      chatStore.addMessage(groupChatNewMessage);
    });

    socket.on("groupChatMessages:patch", (groupChatUpdateMessage) => {
      console.log("groupChatUpdateMessage", groupChatUpdateMessage);

      setChatChange(chatChange => chatChange + 1);
      console.log(chatChange);
      chatStore.updateMessage(groupChatUpdateMessage);
    });

    socket.on( "groupChatMessages:delete", (id) => {
      console.log('ID_DELETE: ', id);

      setChatChange(chatChange => chatChange + 1);
      console.log(chatChange);
      chatStore.deleteMessage(id);
    });
  },[socket]);



  const addMessage = useCallback((newTask) => {
    const addNewTask = {...newTask, id_group: id_group};
    socket.emit("groupChatMessages:post", addNewTask);
  }, []);
  
  const updateMessage = useCallback((updateTask) => {
    socket.emit("groupChatMessages:patch", updateTask);
  }, []);

  const deleteMessage = useCallback((idDeleteTask) => {
    socket.emit("groupChatMessages:delete", idDeleteTask);
  }, []);

  const groupChatMessagesActions = useMemo(
    () => ({
        addMessage,
        updateMessage,
        deleteMessage,
    }),
    []
  );

  return { groupChatMessagesActions };
};