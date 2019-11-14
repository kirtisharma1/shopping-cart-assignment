import React from 'react';
import NavLink from '../../atoms/link/NavLink';
import { HOME, PRODUCTS, SIGNIN, REGISTER } from '../../../constants/header';
import List from '../../atoms/list/List';
import Button from '../../atoms/button/Button';
import './menu.scss';

export default function Menu() {
  const closeMobileNav = () => {
    document.getElementById("nav_mobile").style.width = "0%";
  }

  return (
    <nav id="nav_mobile" className="menu">
      <Button onClick={closeMobileNav} className="menu__close">
        &times;
      </Button>
      <List
        childNodes={
          [
            <NavLink to="/" onClick={closeMobileNav}>{HOME}</NavLink>,
            <NavLink to="/plp/all" onClick={closeMobileNav}>{PRODUCTS}</NavLink>,
            <NavLink to="/login" onClick={closeMobileNav}>{SIGNIN}</NavLink>,
            <NavLink to="/registration" onClick={closeMobileNav}>{REGISTER}</NavLink>
          ]
        }
        className="menu__content"
      />
    </nav>
  )
}