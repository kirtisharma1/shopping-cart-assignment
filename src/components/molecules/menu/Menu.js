import React from 'react';
import { Link } from 'react-router-dom';
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
        <li><Link to="/" onClick={closeMobileNav}>Home</Link></li>
        <li><Link to="/plp/all" onClick={closeMobileNav}>Products</Link></li>
        <li><Link to="/login" onClick={closeMobileNav}>SignIn</Link></li>
        <li><Link to="/registration" onClick={closeMobileNav}>Register</Link></li>
      </ul>
    </nav>
  )
}