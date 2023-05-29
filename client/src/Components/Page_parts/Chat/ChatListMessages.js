import React, { useRef } from 'react'
import ChatMessage from './ChatMessage'

export default function ChatListMessages({id_student, messages, updateMethod, deleteMethod}) {
    const myRef = useRef(null);
    setTimeout(() => {
        myRef.current.scrollIntoView();
    }, 0);

    return (
        <div className='chat_list_messages'>
            {
                messages.map((message) => {
                    return <ChatMessage key={message.id_message} message={message} updateMethod={updateMethod}
                    deleteMethod={deleteMethod} isMyMessage={id_student == message.id_creator}/>
                })
            }
            <div ref={myRef} className='end_chat_list'>
            </div>
        </div>
    )
}
