import { useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

let socket;

export const useGroupChat = (id_group, chatStore) => {
    console.log('groupChatMessages(id_group): ',id_group);

  if (!socket) {
    socket = io(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_SERVER_SOCKET_GROUP_CHAT_PORT}/group-chat`, {
      auth: {
        id_group: String(id_group),
      },
      path: '/chat/',
    });
  }

  const [groupChatMessages, setGroupChatMessages] = useState([]);  

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

      chatStore.chat = groupChatListMessages;
      setGroupChatMessages(groupChatListMessages);
    });

    socket.on("groupChatMessages:post", (groupChatNewMessage) => {
      console.log('groupChatNewMessage: ', groupChatNewMessage);
      
      chatStore.addMessage(groupChatNewMessage);
      setGroupChatMessages([...groupChatMessages, groupChatNewMessage]);
    });

    socket.on("groupChatMessages:patch", (groupChatUpdateMessage) => {
      console.log("groupChatUpdateMessage", groupChatUpdateMessage);

      chatStore.updateMessage(groupChatUpdateMessage);

      setGroupChatMessages(groupChatMessages.map((message) => {
        if (message.id_message == groupChatUpdateMessage.id_message) {
            return groupChatUpdateMessage; // Возможно неверно будет работать
        } else {
            return message;
        }
      }));
    });

    socket.on( "groupChatMessages:delete", (id) => {
      console.log('ID_DELETE: ', id);

      chatStore.deleteMessage(id);

      setGroupChatMessages(groupChatMessages.filter(message => message.id_message != id));
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

  return { groupChatMessages, groupChatMessagesActions };
};