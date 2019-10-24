import React from 'react';
import { Link } from 'react-router-dom';
import EventEmitter from '../../../utils/event';
import './header.scss';
import { LOGO } from '../../../constants';

const CART = require('../../../assets/images/cart.svg');

export default function Header(props) {
    let cartLength = props.cartLength;

    return (
        <header className="header-main">
            <nav>
                <div className="row">
                    <div className="header-left">
                        <a href='#' className="header-logo-anchor">
                            <img src={LOGO}  className="header-logo" alt="Brand Logo"/>
                        </a>
                        <ul className="main-nav" aria-label="Main Navigation">
                            <li className="col-xs-6"><Link to="/">Home</Link></li>
                            <li className="col-xs-6"><Link to="/plp/all">Products</Link></li>
                        </ul>
                    </div>
                    <div className="header-right">   
                        <ul className="signup-nav" aria-label="Login/Registration Navigation">
                            <li className="col-xs-6"><Link to="/login">SignIn</Link></li>
                            <li className="col-xs-6"><Link to="/registration">Register</Link></li>
                        </ul>
                        <button className="btn-cart" onClick={() => props.showCart(true)}>
                            <img src={CART} alt="Cart icon"></img>
                            {cartLength} item{cartLength === 1 ? '' : 's'}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}
