import React, { useEffect, useState } from 'react'

export default function AddOrUpdateChatMessage({addMethod, updateMethod, messageIsUpdated, updatingMessage, isAddOrUpdateMessage}) {
    const [content, setContent] = useState('');
    const [submitButton, setSubmitButton] = useState(true);
    let add_message = 'Отправить';
    let update_message = 'Изменить';

    const messageMethod = () => {
        if(isAddOrUpdateMessage){
            addMethod(content);
        }else {
            updateMethod({...updatingMessage, content: content, updated: true});
        }
        stopUpdateMessage();
    };
    
    useEffect(() => {
        setContent(isAddOrUpdateMessage ? '' : updatingMessage.content);
    },[updatingMessage]);

    const stopUpdateMessage = () => {
        setContent('');
        messageIsUpdated();
    };

    useEffect(() => {
        if(content.length > 0) {
            setSubmitButton(false);
        }else {
            setSubmitButton(true);
        }
    }, [content]);

    return (
        <div className='add_or_update_chat_message'>
            <textarea value={content} placeholder='Ваше сообщение' className='message_add_update_content' wrap='soft' required onChange={e => setContent(e.target.value)}></textarea>
            <div className='add_or_update_button_message'>
                <button type="button" className='chat_create_or_change_button' disabled={submitButton} onClick={() => messageMethod()}>
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
