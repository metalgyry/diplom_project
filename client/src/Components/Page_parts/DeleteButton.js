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
                    <button type='button' className='confirm_delete_project_button' onClick={() => deleteMethod(id)}>Уверены?</button>
                :
                    <button type='button' className='delete_project_button' onClick={clickDeleteButton}>{textButton}</button>
            }
        </div>
    )
}
