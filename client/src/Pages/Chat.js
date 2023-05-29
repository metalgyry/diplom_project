import React, { useState } from 'react'
import ChatWindow from '../Components/Page_parts/Chat/ChatWindow';

export default function Chat() {
    const [isOpenChat, setIsOpenChat] = useState(false);
    let left = '<';

    const clickTorgueChat = () => {
        if(isOpenChat === false) {
            setIsOpenChat(true);
        } else {
            setIsOpenChat(false);
        }
    };

    return (
        <div className='chat'>
            <div className='chat_module'>
                {
                    isOpenChat ?
                        <ChatWindow setIsOpenChat={setIsOpenChat}/> 
                    :
                    <div className='tongue_chat' title='Открыть чат' onClick={clickTorgueChat}>
                        <div className='arrow_tongue_chat'>
                            {
                                left
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
