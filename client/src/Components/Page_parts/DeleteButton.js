import React, { useState } from 'react'

export default function DeleteButton({textButton, deleteMethod, id}) {
    const [isConfirmedDeleteButton, setIsConfirmedDeleteButton] = useState(false);

    const clickDeleteButton = () => {
        setIsConfirmedDeleteButton(true);
        setTimeout(() => {
            setIsConfirmedDeleteButton(false);
        }, 3000);
    };

    return (
        <div className='delete_button_component'>
            {
                isConfirmedDeleteButton ?
                    <div type='button' title='Уверены?' className='confirm_delete_button' onClick={() => deleteMethod(id)}></div>
                :
                    <div className='delete_button' title={textButton} onClick={clickDeleteButton}></div>
            }
        </div>
    )
}
