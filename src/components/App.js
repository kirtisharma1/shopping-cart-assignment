import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainRouter from './MainRouter';
import Header from './organisms/header/Header';
import Footer from './organisms/footer/Footer';
import Cart from './organisms/cart/Cart';
import Menu from './molecules/menu/Menu';
import EventEmitter from '../utils/event';
import useLocalStorage from '../utils/localStorage';
import { GET_CART, GET_CATEGORIES, URL_CART, KEY_CART, UPDATE_CART } from '../constants';
import { checkScreen, sum } from '../utils/abstract';

import '../styles/theme.scss';

// export default class App extends Component {

//   updateCart = (cart) => {
//     this.setState({
//       cart
//     }, () => {
//       localStorage.clear();
//       localStorage.setItem(KEY_CART, JSON.stringify(cart))
//     })
//   }

//   render() {
//     const { categoryList, showCart, cart } = this.state;
//     return (
//       <Router>
//         <>
//           <Header showCart={this.showCart} cartLength={this.sum(cart, 'quantity')} />
//           <main>
//             <MainRouter checkScreen={this.checkScreen} showCart={this.showCart} getCategories={this.getCategoryList} categoryList={categoryList} cart={cart} />
//           </main>
//           <Footer />
//           <Menu />
//           {showCart && !this.checkScreen() && <Cart showCart={this.showCart} cart={cart} />}
//         </>
//       </Router>
//     );
//   }
// }

export default function App() {
  const [categoryList, setCategoryList] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useLocalStorage(KEY_CART ,[]);

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
    if (val && checkScreen()) {
      window.location.href = URL_CART;
    }
    setShowCart(val);
  }

  const updateCart = (cart) => {
    setCart(cart);
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

  return (
    <Router>
        <>
          <Header showCart={handleCart} cartLength={sum(cart, 'quantity')} />
          <main>
            <MainRouter checkScreen={checkScreen} showCart={handleCart} getCategories={getCategoryList} categoryList={categoryList} cart={cart} />
          </main>
          <Footer />
          <Menu />
          {showCart && !checkScreen() && <Cart showCart={handleCart} cart={cart} />}
        </>
      </Router>
  )
}