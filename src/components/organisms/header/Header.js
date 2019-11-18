import React from 'react';
import NavLink from '../../atoms/link/NavLink';
import './header.scss';
import { MENU } from '../../../constants';
import { LOGO, LOGO_2X, HOME, PRODUCTS, SIGNIN, REGISTER } from '../../../constants/header';
import List from '../../atoms/list/List';
import Button from '../../atoms/button/Button';

const CART = require('../../../assets/images/cart.svg');

export default function Header(props) {
  const { cartLength, showCart, showMenu } = props;

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
          <List
            childNodes={
              [
                <NavLink to="/">{HOME}</NavLink>,
                <NavLink to="/plp/all">{PRODUCTS}</NavLink>
              ]
            }
            className="header__left__main-nav"
          />
        </div>
        <div className="header__right">
          <List
            childNodes={
              [
                <NavLink to="/login">{SIGNIN}</NavLink>,
                <NavLink to="/registration">{REGISTER}</NavLink>
              ]
            }
            className="header__right__signup-nav"
          />
          <Button className="btn-cart" onClick={() => showCart(true)}>
            <img src={CART} alt="Cart icon"></img>
            {cartLength} item{cartLength === 1 ? '' : 's'}
          </Button>
        </div>
      </nav>
      <div className="menu_mobile" onClick={showMenu}>
        <button className="btn-empty">&#9776; {MENU}</button>
      </div>
    </header>
  )
}
