import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import FrendsOnline from './FrendsOnline/FrendsOnline';

const Navbar = (props) => {

  return (
  <div>
    <nav className={s.nav}>
      <div><NavLink to="/profile" className={s.nav__link} activeClassName={s.active} > - Profile - </NavLink></div>
      <div><NavLink to="/dialogs" className={s.nav__link} activeClassName={s.active} > - Message - </NavLink></div>
      <div><NavLink to="/users" className={s.nav__link} activeClassName={s.active} > - Users - </NavLink> </div>
      <div><NavLink to="/news" className={s.nav__link} activeClassName={s.active} > - News - </NavLink></div>
      <div><NavLink to="/music" className={s.nav__link} activeClassName={s.active} > - Music - </NavLink></div>
      <div><NavLink to="/settings" className={s.nav__link} activeClassName={s.active} > - Settings - </NavLink></div>
    </nav>
    <FrendsOnline state={props.userOnline}/>
    </div>
  )
}
export default Navbar;