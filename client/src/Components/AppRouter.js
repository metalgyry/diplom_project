import React, { useContext } from 'react'
import { Route, Routes, Navigate} from 'react-router-dom';
import { Context } from '../index';
import { noAuthRouters, authRouters } from './routes';
import { observer } from 'mobx-react-lite'
import Layout from './Page_parts/Layout';

function AppRouter() {
  const {userStore} = useContext(Context); 
  console.log("AppRouter(isAuth): " + userStore.isAuth);
  return (
    <Routes>
        { userStore.isAuth ?
        <Route path='/' element={<Layout/>}>
          {authRouters.map(({path, Component}) => { return <Route key={path} path={path} Component={Component}/> })}
        </Route>
          : 
        noAuthRouters.map(({path, Component}) => { return <Route key={path} path={path} Component={Component}/> })
        }
        <Route path="*" element={<Navigate replace to={ userStore.isAuth ? "/tasks" : "/login"} />}/>
    </Routes>
  )
}

export default observer(AppRouter);