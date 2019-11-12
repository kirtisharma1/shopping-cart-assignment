import React from 'react';
import NavLink from '../../atoms/link/NavLink';
import './header.scss';
import { MENU } from '../../../constants';
import { LOGO, LOGO_2X, HOME, PRODUCTS, SIGNIN, REGISTER } from '../../../constants/header';

const CART = require('../../../assets/images/cart.svg');

export default function Header(props) {
  const { cartLength, showCart } = props;
  const showMobileNav = () => {
    document.getElementById("nav_mobile").style.width = "100%";
  };

  return (
    <header className="header">
      <nav className="row header__nav">
        <div className="header__left">
          <a href='#'>
            <picture>
              <source srcSet={LOGO_2X} media="(min-width: 768px)" />
              <img src={LOGO} className="header__logo" alt="Brand Logo" />
            </picture>
          </a>
          <ul className="header__left__main-nav" aria-label="Main Navigation">
            <li><NavLink to="/">{HOME}</NavLink></li>
            <li><NavLink to="/plp/all">{PRODUCTS}</NavLink></li>
          </ul>
        </div>
        <div className="header__right">
          <ul className="header__right__signup-nav" aria-label="Login/Registration Navigation">
            <li><NavLink to="/login">{SIGNIN}</NavLink></li>
            <li><NavLink to="/registration">{REGISTER}</NavLink></li>
          </ul>
          <button type="button" className="btn-cart" onClick={() => showCart(true)}>
            <img src={CART} alt="Cart icon"></img>
            {cartLength} item{cartLength === 1 ? '' : 's'}
          </button>
        </div>
      </nav>
      <div className="menu_mobile" onClick={showMobileNav}>&#9776; {MENU}</div>
    </header>
  )
}
