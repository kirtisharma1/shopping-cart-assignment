import React, { Component } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainRouter from './MainRouter';
import Header from './organisms/header/Header';
import Footer from './organisms/footer/Footer';
import Cart from './organisms/cart/Cart';
import Menu from './molecules/menu/Menu';
import EventEmitter from '../utils/event';
import { GET_CART, GET_CATEGORIES, URL_CART, KEY_CART, UPDATE_CART } from '../constants';

import '../styles/theme.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      showCart: false,
      cart: []
    }
    EventEmitter.addEventListener(UPDATE_CART, this.updateCart);
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
    if (val && this.checkScreen()) {
      window.location.href = URL_CART;
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
        localStorage.setItem(KEY_CART, JSON.stringify(cart));
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
      localStorage.setItem(KEY_CART, JSON.stringify(cart))
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

  componentWillUnmount() {
    EventEmitter.removeEventListener(UPDATE_CART);
  }

  render() {
    const { categoryList, showCart, cart } = this.state;
    return (
      <Router>
        <React.Fragment>
          <Header showCart={this.showCart} cartLength={this.sum(cart, 'quantity')} />
          <main>
            <MainRouter checkScreen={this.checkScreen} showCart={this.showCart} getCategories={this.getCategoryList} categoryList={categoryList} cart={cart} />
          </main>
          <Footer />
          <Menu />
          {showCart && !this.checkScreen() && <Cart showCart={this.showCart} cart={cart} />}
        </React.Fragment>
      </Router>
    );
  }
}