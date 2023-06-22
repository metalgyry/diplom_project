import React, { useContext, useEffect, useState } from 'react'
import { groupName } from '../../../http/userAPI';
import { useGroupChat } from '../../useGroupChat';
import AddOrUpdateChatMessage from './AddOrUpdateChatMessage';
import ChatListMessages from './ChatListMessages';
import { Context } from '../../../index';

export default function ChatWindow({setIsOpenChat}) {
    const { userStore, chatStore } = useContext(Context);
    const [isAddOrUpdateMessage, setIsAddOrUpdateMessage] = useState(true);
    const [nameGroup, setNameGroup] = useState('');

    const { groupChatMessagesActions } = useGroupChat(userStore.user.id_group, userStore.user.id_student, chatStore)

    const getNameGroup = async () => {
        try {
            const response = await groupName();
            if(response.status === 200) {
              const data = response.data;
              setNameGroup(data.name);
            } else {
              alert("Ошибка: " + response.data.error);
            }
          } catch (error) {
            alert("Ошибка: " + error.response.data.error);
          }
    };
    
    useEffect(() => {
        getNameGroup();
    }, [])

    const closeChat = () => {
        chatStore.isLoadingChat = false;
        setIsOpenChat(false);
    };

    const addMessage = (content) => {
        groupChatMessagesActions.addMessage({id_group: userStore.user.id_group, content: content,
            id_creator: userStore.user.id_student, full_name: userStore.user.full_name});
        console.log(chatStore.chat);
    };

    const updateMessage = (message) => {
        chatStore.updatingMessage = message;
        setIsAddOrUpdateMessage(false);
    };

    const messageIsUpdated = () => {
        chatStore.updatingMessage = {};
        setIsAddOrUpdateMessage(true);
    };
    
    return (
        <div className='chat_window'>
            <div className='chat_header'>
                <div className='close_chat_button' title={'Закрыть чат'} onClick={() => closeChat()}>
                    {'>'}
                </div>
                <div className='name_chat'>
                    {`Чат ${nameGroup}`}
                </div>
            </div>
            <ChatListMessages id_student={userStore.user.id_student} chatStore={chatStore}
                updateMethod={updateMessage} deleteMethod={groupChatMessagesActions.deleteMessage}/>
            <AddOrUpdateChatMessage addMethod={addMessage} updateMethod={groupChatMessagesActions.updateMessage}
                messageIsUpdated={messageIsUpdated} isAddOrUpdateMessage={isAddOrUpdateMessage}
                updatingMessage={chatStore.updatingMessage}/>
        </div>
    )
}
