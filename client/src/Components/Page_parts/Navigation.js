import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
    const classNav = ({isActive}) => isActive ? 'nav_link action' : 'nav_link';

  return (
    <div className='navigation'>
        <NavLink to='/schedule' className={classNav}>Расписание задач</NavLink>
        <NavLink to='/tasks' className={classNav}>Курсы</NavLink>
        <NavLink to='/projects' className={classNav}>Групповые проекты</NavLink>
    </div>
  )
}
