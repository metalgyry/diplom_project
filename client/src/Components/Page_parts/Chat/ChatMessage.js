import React from 'react'
import DeleteButton from '../DeleteButton';

export default function ChatMessage({message, updateMethod, deleteMethod, isMyMessage}) {
    console.log(message);
    console.log(isMyMessage);

    let arrayName = message.full_name.split(' ');
    let date = message.date.split('T');

    return (
        <div className={`${isMyMessage ? 'my_message' : 'other_message'}`}>
            <div className='chat_message'>
                <div className='creator_name_message' title={message.full_name}>
                    {
                        isMyMessage ? 
                            <></>
                        :
                            `${arrayName[0]} ${arrayName[1][0]}. ${arrayName[2][0]}.`
                    }
                </div>
                <div className='message_info'>
                    <div className='message_content_buttons'>
                        <div className='message_content'>
                            {message.content}
                        </div>
                        {
                            isMyMessage ?
                                <div className='message_change_buttons'>
                                    <button type='button' className='update_button' onClick={() => updateMethod(message)}>Изменить</button>
                                    <DeleteButton textButton={'Удалить'} deleteMethod={deleteMethod} id={message.id_message}/>
                                </div>
                            :
                                <></>
                        }
                    </div>
                    <div className='message_time_date'>
                        <div className='message_time'>
                            {date[1].substr(0, 5)}
                        </div>
                        <div className='message_date'>
                            {date[0].replaceAll('-','.')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}