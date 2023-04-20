import React from 'react'
import { Route, Routes, Navigate} from 'react-router-dom';
import { noAuthRouters, authRouters } from './routes';

export default function AppRouter() {
    
  return (
    // УБРАТЬ ВСМЕСТО localStorage НА MOBX
    <Routes>
        { localStorage.getItem("token") ?
        authRouters.map(({path, Component}) => { return <Route key={path} path={path} component={Component} exact/> }) : 
        noAuthRouters.map(({path, Component}) => { return <Route key={path} path={path} component={Component} exact/> })
        }
        <Route path="*" element={<Navigate replace to={ localStorage.getItem("token") ? "/main" : "/login"} />}/>
    </Routes>
  )
}
