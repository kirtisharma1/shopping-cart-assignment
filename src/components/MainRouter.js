import React from 'react';
import {Switch, Route, Link } from "react-router-dom";
import Login from './organisms/login/Login';
import Home from './organisms/home/Home';
import PLP from './organisms/plp/PLP';
import Cart from './organisms/cart/Cart';

export default function MainRouter(props) {
    const categoryList = props.categoryList;
    const cart = props.cart;
    
    return (
            <Switch>
                <Route path="/login" render={(props) => <Login {...props} page='login'/>} />
                <Route path="/registration" render={(props) => <Login {...props} page='registration'/>} />
                <Route path="/plp/:id?" render={(props) => <PLP {...props} categoryList={categoryList} cart={cart}/>} />
                <Route path="/" exact render={(props) => <Home {...props} categoryList={categoryList}/>} /> />
                {props.checkScreen && <Route path="/cart" exact render={(props) => <Cart {...props} showCart={props.showCart} cart={cart}/>} />}
            </Switch>
    )
}