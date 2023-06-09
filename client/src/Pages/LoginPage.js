import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from '../index';
import ErrorMessage from '../Components/Page_parts/LoginPage/ErrorMessage';
import { regPassword, regLogin } from '../Components/regular';
import { signin } from '../http/userAPI';
import '../styles/all_style.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { userStore } = useContext(Context)
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

  const loginButton = async (e) => {
    e.preventDefault();

    try {
      let curPassword = password;
      setPassword("");

      const response = await signin(login, curPassword);
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        userStore.isAuth = true;
        userStore.user = response.data.user;
        navigate("/tasks");
      } else {
        setErrorMessage("Ошибка: " + response.data.error)
      }
    }catch (e) {
      setErrorMessage("Ошибка: " + e.response?.data?.error)
    }
  };

  return (
    <div className="window">
        <div className="window_content">
            <h1 className="main_title">Авторизация</h1>
            <div className="login_form">
                <input type="tel" value={login} minLength="8" className="telephone intext" placeholder="Логин" required onChange={e => setLogin(e.target.value)}/><br/>
                <input type="password" value={password} minLength="3" className="password intext" placeholder="Пароль" required onChange={e => setPassword(e.target.value)}/><br/>
                <button type="button" name="form_button" className="form_button butt" onClick={loginButton} id="submitButton" disabled={submitButton}>Войти</button>
            </div>
            <ErrorMessage error={errorMessage}/>
        </div>
    </div>
  )
}
