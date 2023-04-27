import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Context } from '../../index';
import { signout } from '../../http/userAPI';

function UserInfo() {
    const {userStore} = useContext(Context);
    let array = userStore.user.full_name.split(' ');

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
                {`${array[0]} ${array[1][0]}. ${array[2][0]}.`}
            </div>
            <div className='exit_button'>
                <button type='button' className='butt' onClick={logoutButton}>Выйти</button>
            </div>
        </div>
    )
}

export default observer(UserInfo);