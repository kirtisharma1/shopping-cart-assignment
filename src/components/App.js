import React, { Component } from "react";
import { HashRouter  as Router, Switch, Route, Link } from "react-router-dom";
import MainRouter from './MainRouter';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import Cart from './cart/Cart';
import EventEmitter from '../event';
import { GET_CART, GET_CATEGORIES} from '../constants';

import '../styles/reset.scss';
import '../styles/common.scss';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            showCart: false,
            cart: []
        }
        // EventEmitter.addEventListener('getCart', this.get);
        EventEmitter.addEventListener('updateCart', this.updateCart);
    }
    
    render() {
        const { categoryList, showCart, cart } = this.state;
        return (
            <Router>
                <React.Fragment>
                    <Header showCart={this.showCart} cartLength={this.sum(cart, 'quantity')}/>
                    <MainRouter checkScreen={this.checkScreen} showCart={this.showCart} getCategories={this.getCategoryList} categoryList={categoryList} cart={cart}/>
                    <Footer />
                    {showCart && !this.checkScreen() && <Cart showCart={this.showCart} cart={cart}/>}
                </React.Fragment>
            </Router>
        );
    }

    componentDidMount() {
        this.getCategoryList();
        this.getCart();
    }

    getCategoryList = () => {
        fetch(GET_CATEGORIES)
        .then(res => res.json())
        .then(categoryList => this.setState({
            categoryList
        }));
    }

    showCart = (val) => {
        if(val && this.checkScreen()) {
            window.location.href = '/#/cart';
        }
        
        this.setState({
            showCart: val
        });
    }

    getCart = () => {
        fetch(GET_CART)
        .then(res => res.json())
        .then(cart => this.setState({
            cart
        }, () => {
            localStorage.clear();
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('header getCart');
        }))
    }

    sum = (arr, key) => {
        return arr.reduce((a, b) => a + (b[key] || 0), 0);
    }

    updateCart = (cart) => {
        this.setState({
            cart
        }, () => {
            localStorage.clear();
            localStorage.setItem('cart', JSON.stringify(cart))
        })
    }

    checkScreen = () => {
        let w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        windowWidth = w.innerWidth || e.clientWidth || g.clientWidth;
        return windowWidth < 1025;
    }
}