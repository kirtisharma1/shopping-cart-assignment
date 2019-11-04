import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { LOGO } from '../../../constants';

const CART = require('../../../assets/images/cart.svg');

export default function Header(props) {
  let { cartLength, showCart } = props;

  return (
    <header className="header">
      <nav>
        <div className="row">
          <div className="header__left">
            <a href='#' className="header__logo--anchor">
              <img src={LOGO} className="header__logo" alt="Brand Logo" />
            </a>
            <ul className="header__left__main-nav" aria-label="Main Navigation">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/plp/all">Products</Link></li>
            </ul>
          </div>
          <div className="header__right">
            <ul className="header__right__signup-nav" aria-label="Login/Registration Navigation">
              <li><Link to="/login">SignIn</Link></li>
              <li><Link to="/registration">Register</Link></li>
            </ul>
            <button type="button" className="btn-cart" onClick={() => showCart(true)}>
              <img src={CART} alt="Cart icon"></img>
              {cartLength} item{cartLength === 1 ? '' : 's'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
