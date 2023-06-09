import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter} from 'react-router-dom';
import { Context } from ".";
import AppRouter from './Components/AppRouter';
import jwt_decode from 'jwt-decode'

function App() {
  const {userStore} = useContext(Context);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) return ;
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
      try {
        const user = jwt_decode(accessToken);
        console.log(user);
        userStore.user = user;
        userStore.isAuth = true;
      } catch (error) {
        console.log(error);
      }
    }
    setLoaded(true);
  }, [loaded]);

  return (
    <BrowserRouter>
      { loaded ? <AppRouter/> : null}
    </BrowserRouter>
  );
}


export default App;