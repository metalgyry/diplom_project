import React, { useState } from 'react'

export default function ProjectExitButton({textButton, exitMethod, id}) {
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
                    <button type='button' className='enter_exit_button' onClick={() => exitMethod(id)}>Уверены выйти?</button>
                :
                    <button type='button' className='enter_exit_button' onClick={clickDeleteButton}>{textButton}</button>
            }
        </div>
    )
}
