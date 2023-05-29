import React, { useState } from 'react'

export default function AddOrUpdateChatMessage({addMethod, updateMethod, messageIsUpdated, updatingMessage, isAddOrUpdateMessage}) {
    const [content, setContent] = useState(isAddOrUpdateMessage ? '' : updatingMessage.content);
    console.log("what",updatingMessage.content, isAddOrUpdateMessage, content);
    let add_message = 'Создать';
    let update_message = 'Изменить';

    const messageMethod = () => {
        if(isAddOrUpdateMessage){
            addMethod(content);
        }else {
            updateMethod({...updatingMessage, content: content, updated: true});
        }
        stopUpdateMessage();
    };

    const stopUpdateMessage = () => {
        setContent('');
        messageIsUpdated();
    };

    return (
        <div className='add_or_update_chat_message'>
            <textarea value={content} className='message_add_update_content' wrap='soft' required onChange={e => setContent(e.target.value)}></textarea>
            <div className='add_or_update_button_message'>
                <button type="button" className='chat_create_or_change_button' onClick={() => messageMethod()}>
                    {isAddOrUpdateMessage ? add_message : update_message}
                </button>
                {
                    isAddOrUpdateMessage ?
                        <></>
                    :
                        <button type="button" className='stop_update_button' onClick={() => stopUpdateMessage()}>
                            {'Отмена'}
                        </button>
                }
            </div>
        </div>
    )
}
