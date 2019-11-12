import React from 'react';
import NavLink from '../../atoms/link/NavLink';
import { MENU } from '../../../constants';
import './menu.scss';

export default function Menu() {
  const closeMobileNav = () => {
    document.getElementById("nav_mobile").style.width = "0%";
  }

  return (
    <nav id="nav_mobile" className="menu">
      <button onClick= {closeMobileNav} className="menu__close">&times;</button>
      <ul className="menu__content">
        <li><NavLink to="/" onClick={closeMobileNav}>Home</NavLink></li>
        <li><NavLink to="/plp/all" onClick={closeMobileNav}>Products</NavLink></li>
        <li><NavLink to="/login" onClick={closeMobileNav}>SignIn</NavLink></li>
        <li><NavLink to="/registration" onClick={closeMobileNav}>Register</NavLink></li>
      </ul>
    </nav>
  )
}