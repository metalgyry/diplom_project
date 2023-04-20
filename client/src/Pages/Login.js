import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../index';
import ErrorMessage from '../Components/ErrorMessage';
import { regPassword, regLogin } from '../Components/regular';
import { signin } from '../http/userAPI';
import '../styles/all_style.css';

export default function Login() {
  const router = useHistory();
  const { userStore } = useContext(Context)
  /*
  if( localStorage.getItem("token") ) {
    router.push("/main");
  }
  */
  const regexLog = regLogin;
  const regexPassword = regPassword;
  const [submitButton, setSubmitButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if((regexLog.test(login)) && (regexPassword.test(password))) {
      setSubmitButton(false);
    }else {
      setSubmitButton(true);
    }
  }, [login, password]);

  const loginButton = async () => {
    try {
      // возможно нужно использовать form, но это потом
      const response = await signin(login, password);
      if (response.status === 200) {
              // ТУТ ЧЕРЕЗ MOBX СОХРАНЕНИЕ ДАННЫХ ДА И ВОЗМОЖНО ЭТОТ МЕТОД БУДЕТ ТУТ, НО ТОКЕН ВРОДЕ КАК ВСЕ РАВНО В ЛОКАЛ STORAGE
        localStorage.setItem("token", response.data.token);
        router.push("/main");
      }
    }catch (e) {
      //setErrorMessage(e.message);
            // ТУТ НУЖНО ПОНЯТЬ КАКАЯ ОШИБКА
      setErrorMessage(e.response.data.detail[0].msg)
    }
  };

  return (
    <div className="window">
        <div className="window_content">
            <h1 className="main_title">Авторизация</h1>
            <div className="login_form">
                <input type="tel" value={login} minLength="8" className="telephone intext" placeholder="Логин" required onChange={e => setLogin(e.target.value)}/><br/>
                <input type="password" value={password} minLength="3" className="password intext" placeholder="Пароль" required onChange={e => setPassword(e.target.value)}/><br/>
                <button type="submit" name="form_button" className="form_button butt" onClick={loginButton} id="submitButton" disabled={submitButton}>Войти</button>
            </div>
            <ErrorMessage error={errorMessage}/>
        </div>
    </div>
  )
}
