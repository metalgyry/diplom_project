import React from 'react'
import { Outlet } from 'react-router-dom'
import Chat from '../../Pages/Chat'
import Navigation from './Navigation'
import UserInfo from './UserInfo'

export default function Layout() {
  return (
    <>
    <header className='header_page'>
        <Navigation/>
        <UserInfo/>
    </header>
    <main>
        <Chat/>
        <Outlet/>
    </main>
    </>
  )
}
