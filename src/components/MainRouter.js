import React from 'react';
import {Switch, Route, Link } from "react-router-dom";
import Login from './login/Login';
import Home from './home/Home';
import PLP from './plp/PLP';

export default function MainRouter(props) {
    const categoryList = props.categoryList;
    const cart = props.cart;
    return (
            <Switch>
                <Route path="/login" render={(props) => <Login {...props} page='login'/>} />
                <Route path="/registration" render={(props) => <Login {...props} page='registration'/>} />
                <Route path="/plp/:id?" render={(props) => <PLP {...props} categoryList={categoryList} cart={cart}/>} />
                <Route path="/" exact render={(props) => <Home {...props} categoryList={categoryList}/>} /> />
            </Switch>
    )
}