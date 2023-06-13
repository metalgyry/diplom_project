import React, { useContext, useEffect, useState } from 'react'
import { groupName } from '../../../http/userAPI';
import { useGroupChat } from '../../useGroupChat';
import AddOrUpdateChatMessage from './AddOrUpdateChatMessage';
import ChatListMessages from './ChatListMessages';
import { Context } from '../../../index';

export default function ChatWindow({setIsOpenChat}) {
    const { userStore } = useContext(Context);
    const [isAddOrUpdateMessage, setIsAddOrUpdateMessage] = useState(true);
    const [updatingMessage, setUpdatingMessage] = useState({});
    const [nameGroup, setNameGroup] = useState('');

    const {groupChatMessages, groupChatMessagesActions} = useGroupChat(userStore.user.id_group)

    const getNameGroup = async () => {
        try {
            const response = await groupName();
            if(response.status === 200) {
              const data = response.data;
              console.log(data);
              setNameGroup(data.name);
            } else {
              alert("Ошибка: " + response.data.error);
            }
          } catch (error) {
            console.log(error.response.data.error);
            alert("Ошибка: " + error.response.data.error);
          }
    };
    
    useEffect(() => {
        getNameGroup();
    }, [])

    const addMessage = (content) => {
        groupChatMessagesActions.addMessage({id_group: userStore.user.id_group, content: content,
            id_creator: userStore.user.id_student, full_name: userStore.user.full_name});
    };

    const updateMessage = (message) => {
        setUpdatingMessage(message);
        setIsAddOrUpdateMessage(false);
    };

    const messageIsUpdated = () => {
        setUpdatingMessage({});
        setIsAddOrUpdateMessage(true);
    };
    
    return (
        <div className='chat_window'>
            <div className='chat_header'>
                <div className='close_chat_button' title={'Закрыть чат'} onClick={() => {setIsOpenChat(false)}}>
                    {'>'}
                </div>
                <div className='name_chat'>
                    {`Чат ${nameGroup}`}
                </div>
            </div>
            <ChatListMessages id_student={userStore.user.id_student} messages={groupChatMessages}
                updateMethod={updateMessage} deleteMethod={groupChatMessagesActions.deleteMessage}/>
            <AddOrUpdateChatMessage addMethod={addMessage} updateMethod={groupChatMessagesActions.updateMessage}
                messageIsUpdated={messageIsUpdated} isAddOrUpdateMessage={isAddOrUpdateMessage}
                updatingMessage={updatingMessage}/>
        </div>
    )
}
