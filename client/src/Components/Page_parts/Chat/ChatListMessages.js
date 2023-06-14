import React, { useRef } from 'react'
import ChatMessage from './ChatMessage'

export default function ChatListMessages({id_student, updateMethod, deleteMethod, chatStore}) {
    const myRef = useRef(null);
    setTimeout(() => {
        if(!(chatStore.isLoadingChat)) {
            console.log(!(chatStore.isLoadingChat));
            myRef.current.scrollIntoView();
        }
    }, 0);

    setTimeout(() => {
        chatStore.isLoadingChat = true;
    }, 100);

    return (
        <div className='chat_list_messages'>
            {
                chatStore.chat.map((message) => {
                    return <ChatMessage key={message.id_message} message={message} updateMethod={updateMethod}
                    deleteMethod={deleteMethod} isMyMessage={id_student == message.id_creator}/>
                })
            }
            <div ref={myRef} className='end_chat_list'>
            </div>
        </div>
    )
}
