import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Context } from '../../index';
import { signout } from '../../http/userAPI';

function UserInfo() {
    const {userStore} = useContext(Context);

    const logoutButton = async (e) => {
        e.preventDefault();
        try {
            const response = await signout();
            console.log(response);
            if(response.status === 200) {
                userStore.isAuth = false;
                userStore.user = {};
            }else {
                alert("Не удалось выйти!");
            }
        } catch (error) {
            console.log(error);
            alert(e.response?.data?.error);
        }
    }

    return (
        <div className='user_info'>
            <div className='user_name'>
                {userStore.user.full_name}
            </div>
            <div className='exit_button'>
                <button type='button' className='butt' onClick={logoutButton}>Выйти</button>
            </div>
        </div>
    )
}

export default observer(UserInfo);