import React from 'react';
import { Link } from 'react-router-dom';
import EventEmitter from '../../../event';
import './header.scss';

const LOGO = require('../../../assets/images/logo.png');
const CART = require('../../../assets/images/cart.svg');

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // cartLength: 1,
        }
        
    }

    render() {
        let cartLength = this.props.cartLength;

        return (
            <header className="header-main">
                <nav>
                    <div className="row">
                        <div className="header-left">
                            <a href='#'><img src={LOGO} className="header-logo" /></a>
                            <ul className="main-nav">
                                <li className="col-xs-6"><Link to="/">Home</Link></li>
                                <li className="col-xs-6"><Link to="/plp/all">Products</Link></li>
                            </ul>
                        </div>
                        <div className="header-right">   
                            <ul className="signup-nav">
                                <li className="col-xs-6"><Link to="/login">SignIn</Link></li>
                                <li className="col-xs-6"><Link to="/registration">Register</Link></li>
                            </ul>
                            <button className="btn-cart" onClick={() => this.props.showCart(true)}><img src={CART} alt="Cart icon"></img>{cartLength} item{cartLength === 1 ? '' : 's'}</button>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }

    componentDidMount() {
        EventEmitter.addEventListener('updateCart', this.updateCart);
        // EventEmitter.emitEvent('getCart');
    }

    sum = (arr, key) => {
        return arr.reduce((a, b) => a + (b[key] || 0), 0);
    }

    updateCart = (cart) => {

        this.setState({
            cartLength: this.sum(cart, 'quantity')
        }, () => {
            localStorage.clear();
            localStorage.setItem('cart', JSON.stringify(cart))
        });
    }
}