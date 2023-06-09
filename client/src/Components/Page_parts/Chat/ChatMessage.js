import React from 'react'
import DeleteButton from '../DeleteButton';

export default function ChatMessage({message, updateMethod, deleteMethod, isMyMessage}) {
    let arrayName = message.full_name.split(' ');
    let date = new Date(message.date);

    return (
        <div className={`${isMyMessage ? 'my_message' : 'other_message'}`}>
            <div className='chat_message'>
                <div className='creator_name_message' title={message.full_name}>
                    {
                        isMyMessage ? 
                            <></>
                        :
                            `${arrayName[1]} ${arrayName[0]}`
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
                                    <div className='update_button' title='Изменить' onClick={() => updateMethod(message)}></div>
                                    <DeleteButton textButton={'Удалить'} deleteMethod={deleteMethod} id={message.id_message}/>
                                </div>
                            :
                                <></>
                        }
                    </div>
                    <div className='message_t_d'>
                        <div className='message_time'>
                            {`${(date.getHours() < 10)?"0":""}${date.getHours()}:${(date.getMinutes() < 10)?"0":""}${date.getMinutes()}`}
                        </div>
                        <div className='message_date'>
                            {`${date.getFullYear()}.${((date.getMonth()+1) < 10)?"0":""}${date.getMonth()+1}.${(date.getDate() < 10)?"0":""}${date.getDate()}`}
                        </div>
                    </div>
                    <div className='message_upd'>
                                {
                                    message.updated ?
                                        'изменено'
                                    :
                                        <></>
                                }
                    </div>
                </div>
            </div>
        </div>
    )
}
