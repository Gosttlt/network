import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
const Header = (props) => {
    return (
        <header className={s.header}>
            <img src="https://avatars.mds.yandex.net/get-pdb/1606385/9a8b0ed2-9f84-422c-bcbb-4b0f127b5cdb/s1200?webp=false" />
            <div className={s.loginBlock}>
                {props.isAuth ? <div>{props.login} <button onClick={props.logout}>Выход</button></div> :
                <NavLink to={'/login'}>
                    Войти
                </NavLink>}
            </div>
        </header>
    )
}
export default Header;