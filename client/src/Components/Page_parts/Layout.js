import React from 'react'
import { Outlet } from 'react-router-dom'
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
        <Outlet/>
    </main>
    </>
  )
}
