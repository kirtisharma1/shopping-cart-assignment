import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainRouter from './MainRouter';
import Header from './organisms/header/Header';
import Footer from './organisms/footer/Footer';
import Cart from './organisms/cart/Cart';
import Menu from './molecules/menu/Menu';
import EventEmitter from '../utils/event';
import useLocalStorage from '../utils/localStorage';
import useWindowSize from '../utils/windowResize';
import { GET_CART, GET_CATEGORIES, URL_CART, KEY_CART, UPDATE_CART } from '../constants';
import { sum } from '../utils/abstract';

import '../styles/theme.scss';

export default function App() {
  const [categoryList, setCategoryList] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useLocalStorage(KEY_CART, []);
  const [winWidth, winHeight] = useWindowSize();

  const getCategoryList = () => {
    fetch(GET_CATEGORIES)
      .then(res => res.json())
      .then(list => setCategoryList(list));
  };

  const getCart = () => {
    fetch(GET_CART)
      .then(res => res.json())
      .then(res => setCart(res))
  };

  const handleCart = (val) => {
    if (val && winWidth < 1024) {
      window.location.href = URL_CART;
    }
    setShowCart(val);
  }

  const updateCart = (list) => {
    setCart(list);
  };

  const getHash = (url) => {
    const arr = url.split('/');
    return arr[arr.length - 1].toLowerCase();
  }

  useEffect(() => {
    getCategoryList();
    getCart();
    EventEmitter.addEventListener(UPDATE_CART, updateCart);
    return () => {
      console.log('will unmount');
      EventEmitter.removeEventListener(UPDATE_CART);
    }
  }, []);

  useEffect(() => {
    getHash(window.location.hash);
    if(winWidth >= 1024 && getHash(window.location.hash) === 'cart'){
      window.location.hash= '#';
    };
  }, [winWidth]);

  return (
      <Router>
        <>
          <Header showCart={handleCart} cartLength={sum(cart, 'quantity')} />
          <main>
            <MainRouter checkScreen={winWidth < 1024} showCart={handleCart} getCategories={getCategoryList} categoryList={categoryList} cart={cart} />
          </main>
          <Footer />
          <Menu />
          {showCart && winWidth >= 1024 && <Cart showCart={handleCart} cart={cart} />}
        </>
      </Router>
  )
}