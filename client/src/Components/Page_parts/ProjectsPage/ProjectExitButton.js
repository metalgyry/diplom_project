import React, { useState } from 'react'

export default function ProjectExitButton({textButton, exitMethod, id}) {
    const [isConfirmedExitButton, setIsConfirmedExitButton] = useState(false);

    const clickExitButton = () => {
        setIsConfirmedExitButton(true);
        setTimeout(() => {
            setIsConfirmedExitButton(false);
        }, 3000);
    };

    return (
        <div className='delete_button_component'>
            {
                isConfirmedExitButton ?
                    <button type='button' className='enter_exit_button' onClick={() => exitMethod(id)}>Уверены выйти?</button>
                :
                    <button type='button' className='enter_exit_button' onClick={clickExitButton}>{textButton}</button>
            }
        </div>
    )
}
